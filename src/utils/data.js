// Sample data based on the assignment requirements
export const initialLocations = [
  { id: 1, name: 'Ingang', coordinates: { lat: 51.070636, lng: 4.501598 } },
  { id: 2, name: 'Uitgang', coordinates: { lat: 51.067488, lng: 4.498637 } },
  { id: 3, name: 'Parking', coordinates: { lat: 51.069122, lng: 4.500924 } },
  { id: 4, name: 'Fietsenstalling', coordinates: { lat: 51.067610, lng: 4.499139 } },
  { id: 5, name: 'Sportveld', coordinates: { lat: 51.068914, lng: 4.501394 } }
];

export const initialPersonnel = [
  { id: 1, firstName: 'Marc', lastName: 'Peeters' },
  { id: 2, firstName: 'Jean', lastName: 'Janssens' },
  { id: 3, firstName: 'Patrick', lastName: 'Maes' },
  { id: 4, firstName: 'Luc', lastName: 'Jacobs' },
  { id: 5, firstName: 'Michel', lastName: 'Mertens' },
  { id: 6, firstName: 'Philippe', lastName: 'Willems' },
  { id: 7, firstName: 'Jan', lastName: 'Claes' },
  { id: 8, firstName: 'David', lastName: 'Willems' },
  { id: 9, firstName: 'Thomas', lastName: 'Wouters' },
  { id: 10, firstName: 'Maria', lastName: 'De Smet' },
  { id: 11, firstName: 'Marie', lastName: 'De Vries' },
  { id: 12, firstName: 'Nathalie', lastName: 'Peeters' }
];

export const initialRequiredOccupancy = [
  { id: 1, locationId: 1, startTime: '2025-10-31T18:00:00', endTime: '2025-10-31T20:00:00', required: 2 },
  { id: 2, locationId: 1, startTime: '2025-10-31T20:00:00', endTime: '2025-10-31T22:00:00', required: 4 },
  { id: 3, locationId: 1, startTime: '2025-10-31T22:00:00', endTime: '2025-11-01T02:00:00', required: 2 },
  { id: 4, locationId: 2, startTime: '2025-10-31T18:00:00', endTime: '2025-10-31T20:00:00', required: 2 },
  { id: 5, locationId: 2, startTime: '2025-10-31T20:00:00', endTime: '2025-10-31T22:00:00', required: 3 },
  { id: 6, locationId: 2, startTime: '2025-10-31T22:00:00', endTime: '2025-11-01T02:00:00', required: 6 },
  { id: 7, locationId: 3, startTime: '2025-10-31T18:00:00', endTime: '2025-10-31T20:00:00', required: 2 },
  { id: 8, locationId: 3, startTime: '2025-10-31T20:00:00', endTime: '2025-10-31T22:00:00', required: 4 },
  { id: 9, locationId: 3, startTime: '2025-10-31T22:00:00', endTime: '2025-11-01T02:00:00', required: 6 },
  { id: 10, locationId: 4, startTime: '2025-10-31T18:00:00', endTime: '2025-10-31T20:00:00', required: 2 },
  { id: 11, locationId: 4, startTime: '2025-10-31T20:00:00', endTime: '2025-10-31T22:00:00', required: 4 },
  { id: 12, locationId: 4, startTime: '2025-10-31T22:00:00', endTime: '2025-11-01T02:00:00', required: 4 },
  { id: 13, locationId: 5, startTime: '2025-10-31T20:00:00', endTime: '2025-11-01T02:00:00', required: 8 },
  { id: 14, locationId: 5, startTime: '2025-11-01T02:00:00', endTime: '2025-11-01T06:00:00', required: 3 }
];

// Initial scheduled shifts - matching some of the required occupancy periods
export const initialScheduledShifts = [
  // Ingang (Location 1) - some shifts planned
  { id: 1, locationId: 1, personnelId: 1, startTime: '2025-10-31T18:00:00', endTime: '2025-10-31T20:00:00' },
  { id: 2, locationId: 1, personnelId: 2, startTime: '2025-10-31T18:00:00', endTime: '2025-10-31T20:00:00' },
  { id: 3, locationId: 1, personnelId: 3, startTime: '2025-10-31T20:00:00', endTime: '2025-10-31T22:00:00' },
  { id: 4, locationId: 1, personnelId: 4, startTime: '2025-10-31T20:00:00', endTime: '2025-10-31T22:00:00' },
  
  // Uitgang (Location 2) - some shifts planned
  { id: 5, locationId: 2, personnelId: 8, startTime: '2025-10-31T18:00:00', endTime: '2025-10-31T20:00:00' },
  { id: 6, locationId: 2, personnelId: 9, startTime: '2025-10-31T20:00:00', endTime: '2025-10-31T22:00:00' },
  
  // Parking (Location 3) - some shifts planned
  { id: 7, locationId: 3, personnelId: 5, startTime: '2025-10-31T20:00:00', endTime: '2025-10-31T22:00:00' },
  { id: 8, locationId: 3, personnelId: 6, startTime: '2025-10-31T20:00:00', endTime: '2025-10-31T22:00:00' },
  
  // Fietsenstalling (Location 4) - some shifts planned
  { id: 9, locationId: 4, personnelId: 10, startTime: '2025-10-31T18:00:00', endTime: '2025-10-31T20:00:00' },
  { id: 10, locationId: 4, personnelId: 11, startTime: '2025-10-31T20:00:00', endTime: '2025-10-31T22:00:00' },
  
  // Sportveld (Location 5) - some shifts planned
  { id: 11, locationId: 5, personnelId: 7, startTime: '2025-10-31T20:00:00', endTime: '2025-11-01T02:00:00' },
  { id: 12, locationId: 5, personnelId: 12, startTime: '2025-10-31T20:00:00', endTime: '2025-11-01T02:00:00' },
];

// Status types
export const STATUS_TYPES = {
  PLANNED_NOT_CHECKED: 'planned_not_checked',
  INCOMPLETE_PLANNING: 'incomplete_planning',
  CORRECT_OCCUPANCY: 'correct_occupancy',
  WRONG_PEOPLE: 'wrong_people',
  OVER_OCCUPANCY: 'over_occupancy',
  UNDER_OCCUPANCY: 'under_occupancy'
};

export const STATUS_LABELS = {
  [STATUS_TYPES.PLANNED_NOT_CHECKED]: 'Volledige planning, bezetting nog niet nagekeken',
  [STATUS_TYPES.INCOMPLETE_PLANNING]: 'Onvolledige planning',
  [STATUS_TYPES.CORRECT_OCCUPANCY]: 'Gevraagde bezetting aanwezig volgens planning',
  [STATUS_TYPES.WRONG_PEOPLE]: 'Gevraagde bezetting aanwezig, maar andere personen dan volgens planning',
  [STATUS_TYPES.OVER_OCCUPANCY]: 'Overbezetting',
  [STATUS_TYPES.UNDER_OCCUPANCY]: 'Onderbezetting'
};

export const STATUS_COLORS = {
  [STATUS_TYPES.PLANNED_NOT_CHECKED]: '#FFA500',
  [STATUS_TYPES.INCOMPLETE_PLANNING]: '#FF0000',
  [STATUS_TYPES.CORRECT_OCCUPANCY]: '#00FF00',
  [STATUS_TYPES.WRONG_PEOPLE]: '#FFFF00',
  [STATUS_TYPES.OVER_OCCUPANCY]: '#FF6B6B',
  [STATUS_TYPES.UNDER_OCCUPANCY]: '#FF4500'
};

// Local storage keys
export const STORAGE_KEYS = {
  LOCATIONS: 'pwa_locations',
  PERSONNEL: 'pwa_personnel',
  REQUIRED_OCCUPANCY: 'pwa_required_occupancy',
  SCHEDULED_SHIFTS: 'pwa_scheduled_shifts',
  ACTUAL_OCCUPANCY: 'pwa_actual_occupancy'
};

// Load data from localStorage or use initial data
export const loadData = (key, initialData) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialData;
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    return initialData;
  }
};

// Save data to localStorage
export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
    return false;
  }
};

// Calculate location status
export const calculateLocationStatus = (locationId, requiredOccupancy, scheduledShifts, actualOccupancy, currentTime) => {
  const locationRequirements = requiredOccupancy.filter(req => req.locationId === locationId);
  const activeRequirement = locationRequirements.find(req => {
    const start = new Date(req.startTime);
    const end = new Date(req.endTime);
    return currentTime >= start && currentTime <= end;
  });

  if (!activeRequirement) {
    return null; // No active requirement for this location
  }

  const scheduled = scheduledShifts.filter(shift => 
    shift.locationId === locationId &&
    new Date(shift.startTime) <= currentTime &&
    new Date(shift.endTime) >= currentTime
  );

  const actual = actualOccupancy.filter(occ => 
    occ.locationId === locationId &&
    new Date(occ.timestamp).getTime() <= currentTime.getTime() &&
    (!occ.endTimestamp || new Date(occ.endTimestamp).getTime() >= currentTime.getTime())
  );

  const scheduledPersonnelIds = scheduled.map(s => s.personnelId);
  const actualPersonnelIds = actual.map(a => a.personnelId);

  const requiredCount = activeRequirement.required;
  const scheduledCount = scheduledPersonnelIds.length;
  const actualCount = actualPersonnelIds.length;

  // Check if planning is complete
  if (scheduledCount < requiredCount) {
    return STATUS_TYPES.INCOMPLETE_PLANNING;
  }

  // If not checked yet
  if (actualCount === 0) {
    return STATUS_TYPES.PLANNED_NOT_CHECKED;
  }

  // Check actual occupancy
  if (actualCount === requiredCount) {
    // Check if same people
    const samePeople = scheduledPersonnelIds.length === actualPersonnelIds.length &&
      scheduledPersonnelIds.every(id => actualPersonnelIds.includes(id));
    return samePeople ? STATUS_TYPES.CORRECT_OCCUPANCY : STATUS_TYPES.WRONG_PEOPLE;
  } else if (actualCount > requiredCount) {
    return STATUS_TYPES.OVER_OCCUPANCY;
  } else {
    return STATUS_TYPES.UNDER_OCCUPANCY;
  }
};

