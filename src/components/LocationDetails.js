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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';
import { STATUS_LABELS, STATUS_COLORS } from '../utils/data';

const LocationDetails = ({
  location,
  requiredOccupancy,
  scheduledShifts,
  actualOccupancy,
  personnel,
  onClose,
  onAddRequiredOccupancy,
  onScheduleShift,
  onUpdateActualOccupancy
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
    personnelId: '',
    startTime: '',
    endTime: ''
  });

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
    onScheduleShift({
      ...newShift,
      locationId: location.id
    });
    setNewShift({ personnelId: '', startTime: '', endTime: '' });
    setShowScheduleForm(false);
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
      PaperProps={{
        sx: { height: '90vh' }
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
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Eind Tijdstip"
                      type="datetime-local"
                      value={newRequiredOccupancy.endTime}
                      onChange={(e) => setNewRequiredOccupancy({ ...newRequiredOccupancy, endTime: e.target.value })}
                      required
                      fullWidth
                      InputLabelProps={{ shrink: true }}
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
              {locationRequirements.map(req => (
                <Card key={req.id}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {formatDateTime(req.startTime)} - {formatDateTime(req.endTime)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Aantal personen: {req.required}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
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
                    <FormControl fullWidth required>
                      <InputLabel>Personeel</InputLabel>
                      <Select
                        value={newShift.personnelId}
                        onChange={(e) => setNewShift({ ...newShift, personnelId: e.target.value })}
                        label="Personeel"
                      >
                        {personnel.map(person => (
                          <MenuItem key={person.id} value={person.id}>
                            {person.firstName} {person.lastName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      label="Start Tijdstip"
                      type="datetime-local"
                      value={newShift.startTime}
                      onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
                      required
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Eind Tijdstip"
                      type="datetime-local"
                      value={newShift.endTime}
                      onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
                      required
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                    <Stack direction="row" spacing={2}>
                      <Button type="submit" variant="contained" color="primary">
                        Toevoegen
                      </Button>
                      <Button variant="outlined" onClick={() => setShowScheduleForm(false)}>
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
