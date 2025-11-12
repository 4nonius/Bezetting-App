import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Checkbox,
  Button,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import { format } from 'date-fns';

const OccupancyTracking = ({
  locations,
  personnel,
  scheduledShifts,
  actualOccupancy,
  onUpdateActualOccupancy
}) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPersonnel, setSelectedPersonnel] = useState([]);
  const [currentTime] = useState(new Date());

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    setSelectedPersonnel([]);
  };

  const handlePersonnelToggle = (personnelId) => {
    // Ensure personnelId is always a number
    const id = typeof personnelId === 'string' ? parseInt(personnelId, 10) : personnelId;
    setSelectedPersonnel(prev => {
      if (prev.includes(id)) {
        return prev.filter(pid => pid !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = () => {
    if (!selectedLocation || selectedPersonnel.length === 0) {
      alert('Selecteer een locatie en ten minste één persoon');
      return;
    }

    const locationId = parseInt(selectedLocation);
    const timestamp = currentTime.toISOString();
    const count = selectedPersonnel.length;
    
    // Register all selected personnel (personnelId is already a number)
    selectedPersonnel.forEach(personnelId => {
      onUpdateActualOccupancy({
        locationId,
        personnelId: personnelId, // Already a number, no conversion needed
        timestamp: timestamp
      });
    });

    setSelectedPersonnel([]);
    alert(`${count} persoon${count !== 1 ? 'en' : ''} geregistreerd!`);
  };

  const getPersonnelName = (personnelId) => {
    const person = personnel.find(p => p.id === personnelId);
    return person ? `${person.firstName} ${person.lastName}` : 'Onbekend';
  };

  const locationActual = selectedLocation
    ? actualOccupancy.filter(occ => occ.locationId === parseInt(selectedLocation))
    : [];

  const locationScheduled = selectedLocation
    ? scheduledShifts.filter(shift => shift.locationId === parseInt(selectedLocation))
    : [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bezetting Registreren
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel>Selecteer Locatie</InputLabel>
            <Select
              value={selectedLocation}
              onChange={handleLocationChange}
              label="Selecteer Locatie"
              variant="outlined"
            >
              {locations.map(location => (
                <MenuItem key={location.id} value={location.id}>
                  {location.name} (#{location.id})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedLocation && (
            <>
              <Divider />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Selecteer Aanwezige Personen
                </Typography>
                <Grid container spacing={2}>
                  {personnel.map(person => {
                    // Use numbers consistently throughout
                    const isSelected = selectedPersonnel.includes(person.id);
                    const isScheduled = locationScheduled.some(
                      shift => shift.personnelId === person.id
                    );

                    return (
                      <Grid item xs={12} sm={6} md={4} key={person.id}>
                        <Card
                          sx={{
                            cursor: 'pointer',
                            border: isSelected ? 2 : 1,
                            borderColor: isSelected ? 'primary.main' : 'divider',
                            bgcolor: isSelected ? 'primary.light' : 'background.paper',
                            transition: 'all 0.2s',
                            '&:hover': {
                              borderColor: 'primary.main',
                              transform: 'translateY(-2px)',
                              boxShadow: 2,
                            },
                          }}
                          onClick={() => handlePersonnelToggle(person.id)}
                        >
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Checkbox
                                checked={isSelected}
                                onChange={() => handlePersonnelToggle(person.id)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1">
                                  {person.firstName} {person.lastName}
                                </Typography>
                                {isScheduled && (
                                  <Chip
                                    label="Gepland"
                                    size="small"
                                    color="primary"
                                    sx={{ mt: 0.5 }}
                                  />
                                )}
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>

              <Button
                variant="contained"
                size="large"
                startIcon={<CheckCircleIcon />}
                onClick={handleSubmit}
                disabled={selectedPersonnel.length === 0}
                fullWidth
                sx={{ mt: 2 }}
              >
                Registreer Bezetting ({selectedPersonnel.length} persoon{selectedPersonnel.length !== 1 ? 'en' : ''})
              </Button>
            </>
          )}
        </Stack>
      </Paper>

      {selectedLocation && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Geplande Bezetting
              </Typography>
              <Stack spacing={1} sx={{ mt: 2 }}>
                {locationScheduled.length > 0 ? (
                  locationScheduled.map(shift => (
                    <Card key={shift.id} variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon color="primary" />
                          <Typography variant="body1">
                            {getPersonnelName(shift.personnelId)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    Geen shifts gepland voor deze locatie
                  </Typography>
                )}
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Geregistreerde Bezetting
              </Typography>
              <Stack spacing={1} sx={{ mt: 2 }}>
                {locationActual.length > 0 ? (
                  locationActual.map(occ => (
                    <Card key={occ.id} variant="outlined" sx={{ bgcolor: 'success.light' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircleIcon color="success" />
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body1">
                              {getPersonnelName(occ.personnelId)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {format(new Date(occ.timestamp), 'dd/MM/yyyy HH:mm')}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    Geen bezetting geregistreerd
                  </Typography>
                )}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default OccupancyTracking;
