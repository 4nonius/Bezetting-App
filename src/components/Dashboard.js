import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  FormControlLabel,
  Switch,
  TextField,
  Paper,
  Stack,
  Alert,
} from '@mui/material';
import { STATUS_TYPES, STATUS_LABELS, STATUS_COLORS, calculateLocationStatus } from '../utils/data';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const Dashboard = ({ locations, requiredOccupancy, scheduledShifts, actualOccupancy, onLocationSelect }) => {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isRealTime, setIsRealTime] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isRealTime) {
        setSelectedTime(new Date());
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [isRealTime]);

  const [dateWarning, setDateWarning] = useState('');
  const [dateInputValue, setDateInputValue] = useState('');

  // Initialize date input value
  useEffect(() => {
    if (!isRealTime && selectedTime instanceof Date && !isNaN(selectedTime.getTime())) {
      setDateInputValue(selectedTime.toISOString().slice(0, 16));
    }
  }, [isRealTime, selectedTime]);

  // Validate and handle date changes
  const handleTimeChange = (e) => {
    const inputValue = e.target.value;
    setDateInputValue(inputValue);
    
    // Allow empty input while typing
    if (!inputValue) {
      setDateWarning('');
      return;
    }

    // Try to parse the date
    const newDate = new Date(inputValue);
    
    // Check if date is valid
    if (isNaN(newDate.getTime())) {
      // Don't set warning immediately while typing - only on blur
      return;
    }

    // Update the selected time immediately if valid
    setSelectedTime(newDate);

    // Check if year is reasonable (between 1900 and 2100)
    const year = newDate.getFullYear();
    const currentYear = new Date().getFullYear();
    const minYear = 1900;
    const maxYear = 2100;

    if (year < minYear) {
      setDateWarning(`Waarschuwing: Het jaar ${year} is meer dan ${currentYear - minYear} jaar geleden. Dit lijkt onwaarschijnlijk.`);
    } else if (year > maxYear) {
      setDateWarning(`Waarschuwing: Het jaar ${year} is meer dan ${maxYear - currentYear} jaar in de toekomst. Dit lijkt onwaarschijnlijk.`);
    } else if (Math.abs(year - currentYear) > 100) {
      setDateWarning(`Waarschuwing: Het jaar ${year} is meer dan 100 jaar verwijderd van het huidige jaar (${currentYear}).`);
    } else {
      setDateWarning('');
    }
  };

  // Validate on blur
  const handleTimeBlur = (e) => {
    const inputValue = e.target.value;
    
    if (!inputValue) {
      setDateWarning('');
      return;
    }

    const newDate = new Date(inputValue);
    
    if (isNaN(newDate.getTime())) {
      setDateWarning('Ongeldige datum');
      // Reset to valid date
      const validDate = selectedTime instanceof Date && !isNaN(selectedTime.getTime()) 
        ? selectedTime 
        : new Date();
      setDateInputValue(validDate.toISOString().slice(0, 16));
      setSelectedTime(validDate);
    } else {
      setSelectedTime(newDate);
      setDateInputValue(newDate.toISOString().slice(0, 16));
    }
  };

  // Ensure selectedTime is always valid for display
  const validSelectedTime = selectedTime instanceof Date && !isNaN(selectedTime.getTime())
    ? selectedTime 
    : new Date();

  const getLocationStats = (locationId) => {
    // Get active requirement for the selected time
    const activeRequirement = requiredOccupancy.find(req => {
      const start = new Date(req.startTime);
      const end = new Date(req.endTime);
      return req.locationId === locationId && validSelectedTime >= start && validSelectedTime <= end;
    });

    // Get all requirements for this location (for total count)
    const allRequirements = requiredOccupancy.filter(req => req.locationId === locationId);
    
    // Get scheduled shifts active at selected time
    const scheduledActive = scheduledShifts.filter(shift => 
      shift.locationId === locationId &&
      new Date(shift.startTime) <= validSelectedTime &&
      new Date(shift.endTime) >= validSelectedTime
    ).length;

    // Get all scheduled shifts for this location (for total count)
    const allScheduled = scheduledShifts.filter(shift => shift.locationId === locationId).length;

    // Get actual occupancy active at selected time
    const actualActive = actualOccupancy.filter(occ => 
      occ.locationId === locationId &&
      new Date(occ.timestamp).getTime() <= validSelectedTime.getTime() &&
      (!occ.endTimestamp || new Date(occ.endTimestamp).getTime() >= validSelectedTime.getTime())
    ).length;

    // Get all actual occupancy for this location (for total count)
    const allActual = actualOccupancy.filter(occ => occ.locationId === locationId).length;

    // Calculate status - try active requirement first, then check if there's any data
    let status = null;
    if (activeRequirement) {
      status = calculateLocationStatus(
        locationId,
        requiredOccupancy,
        scheduledShifts,
        actualOccupancy,
        validSelectedTime
      );
    } else if (allRequirements.length > 0) {
      // No active requirement, but there are requirements defined
      // Calculate status based on totals
      const totalRequired = allRequirements.reduce((sum, req) => sum + req.required, 0);
      
      if (allScheduled === 0 && allActual === 0) {
        // No planning or occupancy at all
        status = null; // Keep grey
      } else if (allScheduled < totalRequired) {
        // Incomplete planning
        status = STATUS_TYPES.INCOMPLETE_PLANNING;
      } else if (allScheduled >= totalRequired && allActual === 0) {
        // Planning complete but not checked yet
        status = STATUS_TYPES.PLANNED_NOT_CHECKED;
      } else if (allActual > 0) {
        // There's actual occupancy - need to check if it matches
        // For simplicity, if actual matches required average, show as correct
        const avgRequired = totalRequired / allRequirements.length;
        if (allActual === avgRequired) {
          status = STATUS_TYPES.CORRECT_OCCUPANCY;
        } else if (allActual > avgRequired) {
          status = STATUS_TYPES.OVER_OCCUPANCY;
        } else {
          status = STATUS_TYPES.UNDER_OCCUPANCY;
        }
      }
    }

    // If there's an active requirement, show active data; otherwise show totals
    if (activeRequirement) {
      return {
        status,
        scheduled: scheduledActive,
        actual: actualActive,
        required: activeRequirement.required
      };
    } else {
      // No active requirement, show totals instead
      // "Gevraagd" shows number of time slots (like in Location Details)
      return {
        status: status, // Use the calculated status (or null if no data)
        scheduled: allScheduled,
        actual: allActual,
        required: allRequirements.length // Number of time slots defined
      };
    }
  };

  const getStatusColor = (status) => {
    if (!status) return '#CCCCCC'; // Grey for no status
    // Handle both string keys and STATUS_TYPES enum
    if (status in STATUS_COLORS) {
      return STATUS_COLORS[status];
    }
    // Fallback for direct status type strings
    const statusMap = {
      'planned_not_checked': STATUS_COLORS[STATUS_TYPES.PLANNED_NOT_CHECKED],
      'incomplete_planning': STATUS_COLORS[STATUS_TYPES.INCOMPLETE_PLANNING],
      'correct_occupancy': STATUS_COLORS[STATUS_TYPES.CORRECT_OCCUPANCY],
      'wrong_people': STATUS_COLORS[STATUS_TYPES.WRONG_PEOPLE],
      'over_occupancy': STATUS_COLORS[STATUS_TYPES.OVER_OCCUPANCY],
      'under_occupancy': STATUS_COLORS[STATUS_TYPES.UNDER_OCCUPANCY],
    };
    return statusMap[status] || '#CCCCCC';
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{
            fontWeight: 600,
            color: '#20232a',
            mb: 3,
            fontSize: { xs: '1.75rem', md: '2rem' },
          }}
        >
          Dashboard - Bezettingsoverzicht
        </Typography>
        <Paper sx={{ p: 2, mt: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <FormControlLabel
              control={
                <Switch
                  checked={isRealTime}
                  onChange={(e) => {
                    setIsRealTime(e.target.checked);
                    if (e.target.checked) {
                      const now = new Date();
                      setSelectedTime(now);
                      setDateInputValue(now.toISOString().slice(0, 16));
                      setDateWarning('');
                    }
                  }}
                />
              }
              label="Real-time"
            />
            <TextField
              type="datetime-local"
              label="Selecteer tijdstip"
              value={dateInputValue || validSelectedTime.toISOString().slice(0, 16)}
              onChange={handleTimeChange}
              onBlur={handleTimeBlur}
              disabled={isRealTime}
              size="small"
              sx={{ flexGrow: 1, maxWidth: 300 }}
              error={dateWarning.includes('Ongeldige')}
              helperText={dateWarning.includes('Ongeldige') ? dateWarning : ''}
              inputProps={{
                min: '1900-01-01T00:00',
                max: '2100-12-31T23:59',
              }}
            />
          </Stack>
          {dateWarning && dateWarning.includes('Waarschuwing') && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {dateWarning}
            </Alert>
          )}
        </Paper>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {locations.map(location => {
          const stats = getLocationStats(location.id);
          const statusColor = getStatusColor(stats.status);
          
          return (
            <Grid item xs={12} sm={6} md={4} key={location.id}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  border: '1px solid #e1e4e8 !important',
                  borderLeft: '1px solid #e1e4e8 !important',
                  borderRight: '1px solid #e1e4e8 !important',
                  borderTop: '1px solid #e1e4e8 !important',
                  borderBottom: '1px solid #e1e4e8 !important',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    borderColor: '#e1e4e8 !important',
                  },
                }}
                onClick={() => onLocationSelect(location.id)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h2">
                      {location.name}
                    </Typography>
                    <Chip
                      label={`#${location.id}`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={stats.status ? STATUS_LABELS[stats.status] : 'Geen actieve bezetting'}
                      sx={{
                        backgroundColor: statusColor,
                        color: statusColor === '#CCCCCC' ? '#666666' : 'white',
                        fontWeight: 500,
                        width: '100%',
                        justifyContent: 'flex-start',
                      }}
                    />
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box sx={{ 
                        textAlign: 'center',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'rgba(99, 102, 241, 0.08)',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: 'rgba(99, 102, 241, 0.12)',
                          transform: 'scale(1.05)',
                        },
                      }}>
                        <PeopleIcon sx={{ mb: 0.5, color: 'primary.main', fontSize: 28 }} />
                        <Typography variant="h5" color="text.primary" fontWeight={700}>
                          {stats.required}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                          Gevraagd
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ 
                        textAlign: 'center',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'rgba(139, 92, 246, 0.08)',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: 'rgba(139, 92, 246, 0.12)',
                          transform: 'scale(1.05)',
                        },
                      }}>
                        <EventAvailableIcon sx={{ mb: 0.5, color: 'secondary.main', fontSize: 28 }} />
                        <Typography variant="h5" color="text.primary" fontWeight={700}>
                          {stats.scheduled}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                          Gepland
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ 
                        textAlign: 'center',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'rgba(16, 185, 129, 0.08)',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: 'rgba(16, 185, 129, 0.12)',
                          transform: 'scale(1.05)',
                        },
                      }}>
                        <LocationOnIcon sx={{ mb: 0.5, color: 'success.main', fontSize: 28 }} />
                        <Typography variant="h5" color="text.primary" fontWeight={700}>
                          {stats.actual}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                          Aanwezig
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Status Legende
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: 1,
                    backgroundColor: STATUS_COLORS[key],
                  }}
                />
                <Typography variant="body2">{label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;
