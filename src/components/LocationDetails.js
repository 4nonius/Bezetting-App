import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { format } from 'date-fns';

const LocationDetails = ({
  location,
  requiredOccupancy,
  scheduledShifts,
  actualOccupancy,
  personnel,
  onClose,
  onAddRequiredOccupancy,
  onScheduleShift
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showAddRequired, setShowAddRequired] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newRequiredOccupancy, setNewRequiredOccupancy] = useState({
    startTime: '',
    endTime: '',
    required: 1
  });
  const [newShift, setNewShift] = useState({
    personnelIds: [],
    startTime: '',
    endTime: ''
  });
  const [convertingRequirement, setConvertingRequirement] = useState(null);
  const [selectedPersonnelForRequirements, setSelectedPersonnelForRequirements] = useState({});

  if (!location) return null;

  const locationRequirements = requiredOccupancy.filter(req => req.locationId === location.id);
  const locationShifts = scheduledShifts.filter(shift => shift.locationId === location.id);
  const locationActual = actualOccupancy.filter(occ => occ.locationId === location.id);

  const getPersonnelName = (personnelId) => {
    const person = personnel.find(p => p.id === personnelId);
    return person ? `${person.firstName} ${person.lastName}` : 'Onbekend';
  };

  const handleAddRequiredOccupancy = (e) => {
    e.preventDefault();
    onAddRequiredOccupancy({
      ...newRequiredOccupancy,
      locationId: location.id
    });
    setNewRequiredOccupancy({ startTime: '', endTime: '', required: 1 });
    setShowAddRequired(false);
  };

  const handleScheduleShift = (e) => {
    e.preventDefault();
    if (newShift.personnelIds.length === 0) {
      alert('Selecteer ten minste één persoon');
      return;
    }
    
    // Create a shift for each selected person
    newShift.personnelIds.forEach(personnelId => {
      onScheduleShift({
        personnelId: parseInt(personnelId),
        startTime: newShift.startTime,
        endTime: newShift.endTime,
        locationId: location.id
      });
    });
    
    setNewShift({ personnelIds: [], startTime: '', endTime: '' });
    setShowScheduleForm(false);
  };

  const handlePersonnelToggle = (personnelId) => {
    setNewShift(prev => {
      const personnelIds = prev.personnelIds || [];
      if (personnelIds.includes(personnelId)) {
        return { ...prev, personnelIds: personnelIds.filter(id => id !== personnelId) };
      } else {
        return { ...prev, personnelIds: [...personnelIds, personnelId] };
      }
    });
  };

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: { height: '90vh' }
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h5" component="span">
              {location.name}
            </Typography>
            <Chip label={`Locatie #${location.id}`} size="small" sx={{ ml: 2 }} />
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Coördinaten: {location.coordinates.lat.toFixed(6)}, {location.coordinates.lng.toFixed(6)}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Overzicht" />
            <Tab label="Gevraagde Bezetting" />
            <Tab label="Geplande Shifts" />
            <Tab label="Actuele Bezetting" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Gevraagde Bezetting
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {locationRequirements.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    tijdsslot(en) gedefinieerd
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Geplande Shifts
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {locationShifts.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    shift(s) gepland
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Actuele Bezetting
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {locationActual.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    registratie(s)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Gevraagde Bezetting</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setShowAddRequired(!showAddRequired)}
              >
                Toevoegen
              </Button>
            </Box>

            {showAddRequired && (
              <Card sx={{ mb: 3, p: 2 }}>
                <form onSubmit={handleAddRequiredOccupancy}>
                  <Stack spacing={2}>
                    <TextField
                      label="Start Tijdstip"
                      type="datetime-local"
                      value={newRequiredOccupancy.startTime}
                      onChange={(e) => setNewRequiredOccupancy({ ...newRequiredOccupancy, startTime: e.target.value })}
                      required
                      fullWidth
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                    />
                    <TextField
                      label="Eind Tijdstip"
                      type="datetime-local"
                      value={newRequiredOccupancy.endTime}
                      onChange={(e) => setNewRequiredOccupancy({ ...newRequiredOccupancy, endTime: e.target.value })}
                      required
                      fullWidth
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                    />
                    <TextField
                      label="Aantal Personen"
                      type="number"
                      min="1"
                      value={newRequiredOccupancy.required}
                      onChange={(e) => setNewRequiredOccupancy({ ...newRequiredOccupancy, required: parseInt(e.target.value) })}
                      required
                      fullWidth
                    />
                    <Stack direction="row" spacing={2}>
                      <Button type="submit" variant="contained" color="primary">
                        Toevoegen
                      </Button>
                      <Button variant="outlined" onClick={() => setShowAddRequired(false)}>
                        Annuleren
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </Card>
            )}

            <Stack spacing={2}>
              {locationRequirements.map(req => {
                // Check if this requirement already has shifts planned
                const existingShifts = locationShifts.filter(shift => 
                  shift.startTime === req.startTime && shift.endTime === req.endTime
                );
                const isConverting = convertingRequirement === req.id;
                const selectedPersonnelForReq = selectedPersonnelForRequirements[req.id] || [];
                
                const handleConvertToShifts = () => {
                  if (selectedPersonnelForReq.length === 0) {
                    alert(`Selecteer ten minste ${req.required} persoon${req.required !== 1 ? 'en' : ''} voor deze shift`);
                    return;
                  }
                  
                  // Create shifts for each selected person
                  selectedPersonnelForReq.forEach(personnelId => {
                    onScheduleShift({
                      personnelId: parseInt(personnelId),
                      startTime: req.startTime,
                      endTime: req.endTime,
                      locationId: location.id
                    });
                  });
                  
                  setSelectedPersonnelForRequirements(prev => {
                    const newState = { ...prev };
                    delete newState[req.id];
                    return newState;
                  });
                  setConvertingRequirement(null);
                };

                const handlePersonnelToggleForReq = (personnelId) => {
                  setSelectedPersonnelForRequirements(prev => {
                    const current = prev[req.id] || [];
                    if (current.includes(personnelId)) {
                      return { ...prev, [req.id]: current.filter(id => id !== personnelId) };
                    } else {
                      return { ...prev, [req.id]: [...current, personnelId] };
                    }
                  });
                };
                
                return (
                <Card key={req.id}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {formatDateTime(req.startTime)} - {formatDateTime(req.endTime)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Aantal personen: {req.required}
                        </Typography>
                        {existingShifts.length > 0 && (
                          <Chip 
                            label={`${existingShifts.length} shift${existingShifts.length !== 1 ? 's' : ''} gepland`}
                            size="small"
                            color="success"
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Box>
                      <Button
                        variant={isConverting ? "outlined" : "contained"}
                        size="small"
                        startIcon={<CheckCircleIcon />}
                        onClick={() => {
                          if (isConverting) {
                            setConvertingRequirement(null);
                            setSelectedPersonnelForRequirements(prev => {
                              const newState = { ...prev };
                              delete newState[req.id];
                              return newState;
                            });
                          } else {
                            setConvertingRequirement(req.id);
                          }
                        }}
                        sx={{ ml: 2 }}
                      >
                        {isConverting ? 'Annuleren' : existingShifts.length > 0 ? 'Meer Toevoegen' : 'Naar Shifts'}
                      </Button>
                    </Box>
                    
                    {isConverting && (
                      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e1e4e8' }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                          Selecteer {req.required} persoon{req.required !== 1 ? 'en' : ''} voor deze shift
                        </Typography>
                        <Card variant="outlined" sx={{ p: 2, maxHeight: 200, overflow: 'auto', mb: 2 }}>
                          <Stack spacing={1}>
                            {personnel.map(person => (
                              <FormControlLabel
                                key={person.id}
                                control={
                                  <Checkbox
                                    checked={selectedPersonnelForReq.includes(person.id)}
                                    onChange={() => handlePersonnelToggleForReq(person.id)}
                                  />
                                }
                                label={`${person.firstName} ${person.lastName}`}
                              />
                            ))}
                          </Stack>
                        </Card>
                        {selectedPersonnelForReq.length > 0 && (
                          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                            {selectedPersonnelForReq.length} persoon{selectedPersonnelForReq.length !== 1 ? 'en' : ''} geselecteerd
                          </Typography>
                        )}
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleConvertToShifts}
                            disabled={selectedPersonnelForReq.length === 0}
                          >
                            {selectedPersonnelForReq.length > 0 ? `${selectedPersonnelForReq.length} Shift${selectedPersonnelForReq.length !== 1 ? 's' : ''} Toevoegen` : 'Selecteer Personen'}
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setConvertingRequirement(null);
                              setSelectedPersonnelForRequirements(prev => {
                                const newState = { ...prev };
                                delete newState[req.id];
                                return newState;
                              });
                            }}
                          >
                            Annuleren
                          </Button>
                        </Stack>
                      </Box>
                    )}
                  </CardContent>
                </Card>
                );
              })}
              {locationRequirements.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  Geen gevraagde bezetting gedefinieerd
                </Typography>
              )}
            </Stack>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Geplande Shifts</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setShowScheduleForm(!showScheduleForm)}
              >
                Shift Toevoegen
              </Button>
            </Box>

            {showScheduleForm && (
              <Card sx={{ mb: 3, p: 2 }}>
                <form onSubmit={handleScheduleShift}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                        Selecteer Personeel (meerdere mogelijk)
                      </Typography>
                      <Card variant="outlined" sx={{ p: 2, maxHeight: 200, overflow: 'auto' }}>
                        <Stack spacing={1}>
                          {personnel.map(person => (
                            <FormControlLabel
                              key={person.id}
                              control={
                                <Checkbox
                                  checked={newShift.personnelIds?.includes(person.id) || false}
                                  onChange={() => handlePersonnelToggle(person.id)}
                                />
                              }
                              label={`${person.firstName} ${person.lastName}`}
                            />
                          ))}
                        </Stack>
                      </Card>
                      {newShift.personnelIds?.length > 0 && (
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                          {newShift.personnelIds.length} persoon{newShift.personnelIds.length !== 1 ? 'en' : ''} geselecteerd
                        </Typography>
                      )}
                    </Box>
                    <TextField
                      label="Start Tijdstip"
                      type="datetime-local"
                      value={newShift.startTime}
                      onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
                      required
                      fullWidth
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                    />
                    <TextField
                      label="Eind Tijdstip"
                      type="datetime-local"
                      value={newShift.endTime}
                      onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
                      required
                      fullWidth
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                    />
                    <Stack direction="row" spacing={2}>
                      <Button type="submit" variant="contained" color="primary">
                        {newShift.personnelIds?.length > 0 ? `${newShift.personnelIds.length} Shift${newShift.personnelIds.length !== 1 ? 's' : ''} Toevoegen` : 'Toevoegen'}
                      </Button>
                      <Button variant="outlined" onClick={() => {
                        setShowScheduleForm(false);
                        setNewShift({ personnelIds: [], startTime: '', endTime: '' });
                      }}>
                        Annuleren
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </Card>
            )}

            <Stack spacing={2}>
              {locationShifts.map(shift => (
                <Card key={shift.id}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {getPersonnelName(shift.personnelId)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDateTime(shift.startTime)} - {formatDateTime(shift.endTime)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
              {locationShifts.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  Geen shifts gepland
                </Typography>
              )}
            </Stack>
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Actuele Bezetting
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {locationActual.map(occ => (
                <Card key={occ.id}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {getPersonnelName(occ.personnelId)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Geregistreerd: {formatDateTime(occ.timestamp)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
              {locationActual.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  Geen actuele bezetting geregistreerd
                </Typography>
              )}
            </Stack>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LocationDetails;
