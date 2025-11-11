import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import LocationDetails from './components/LocationDetails';
import OccupancyTracking from './components/OccupancyTracking';
import OfflineIndicator from './components/OfflineIndicator';
import {
  initialLocations,
  initialPersonnel,
  initialRequiredOccupancy,
  initialScheduledShifts,
  STORAGE_KEYS,
  loadData,
  saveData
} from './utils/data';

// Create Material-UI theme following Create React App design principles
// Focus on: clean, minimal, content-first, generous whitespace
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#61dafb', // React blue - clean and professional
      light: '#7ee3fc',
      dark: '#4dc8e8',
      contrastText: '#000000',
    },
    secondary: {
      main: '#20232a', // Dark gray for contrast
      light: '#282c34',
      dark: '#181a1f',
    },
    background: {
      default: '#ffffff', // Clean white background
      paper: '#ffffff',
    },
    text: {
      primary: '#20232a', // High contrast for readability
      secondary: '#6d6d6d',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      color: '#20232a',
      marginBottom: '1rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      color: '#20232a',
      marginBottom: '0.75rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: '#20232a',
      marginBottom: '0.5rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      color: '#20232a',
      marginBottom: '0.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.5,
      color: '#20232a',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#20232a',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#20232a',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#6d6d6d',
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 8, // Simpler, cleaner borders
  },
  spacing: 8, // Consistent 8px spacing unit
  shadows: [
    'none',
    '0 1px 3px rgba(0, 0, 0, 0.05)',
    '0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.1)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  ],
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: 8,
          border: '1px solid #e1e4e8',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
            borderColor: '#61dafb',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '10px 20px',
          fontSize: '1rem',
          boxShadow: 'none',
          border: '1px solid transparent',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          backgroundColor: '#61dafb',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#4dc8e8',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        outlined: {
          borderColor: '#61dafb',
          color: '#61dafb',
          '&:hover': {
            borderColor: '#4dc8e8',
            backgroundColor: 'rgba(97, 218, 251, 0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e1e4e8',
        },
        elevation1: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        elevation2: {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#20232a',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid #e1e4e8',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            backgroundColor: '#ffffff',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#61dafb',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#61dafb',
                borderWidth: 2,
              },
            },
          },
        },
      },
    },
  },
});

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [showLocationDetails, setShowLocationDetails] = useState(false);

  // Load data from localStorage or use initial data
  const [locations] = useState(() => loadData(STORAGE_KEYS.LOCATIONS, initialLocations));
  const [personnel] = useState(() => loadData(STORAGE_KEYS.PERSONNEL, initialPersonnel));
  const [requiredOccupancy, setRequiredOccupancy] = useState(() => 
    loadData(STORAGE_KEYS.REQUIRED_OCCUPANCY, initialRequiredOccupancy)
  );
  const [scheduledShifts, setScheduledShifts] = useState(() => 
    loadData(STORAGE_KEYS.SCHEDULED_SHIFTS, initialScheduledShifts)
  );
  const [actualOccupancy, setActualOccupancy] = useState(() => 
    loadData(STORAGE_KEYS.ACTUAL_OCCUPANCY, [])
  );

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveData(STORAGE_KEYS.LOCATIONS, locations);
  }, [locations]);

  useEffect(() => {
    saveData(STORAGE_KEYS.PERSONNEL, personnel);
  }, [personnel]);

  useEffect(() => {
    saveData(STORAGE_KEYS.REQUIRED_OCCUPANCY, requiredOccupancy);
  }, [requiredOccupancy]);

  useEffect(() => {
    saveData(STORAGE_KEYS.SCHEDULED_SHIFTS, scheduledShifts);
  }, [scheduledShifts]);

  useEffect(() => {
    saveData(STORAGE_KEYS.ACTUAL_OCCUPANCY, actualOccupancy);
  }, [actualOccupancy]);

  // Sync data when coming back online
  useEffect(() => {
    const handleOnline = () => {
      console.log('Online - syncing data...');
    };

    const handleOffline = () => {
      console.log('Offline - using cached data');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLocationSelect = (locationId) => {
    setSelectedLocationId(locationId);
    setShowLocationDetails(true);
  };

  const handleCloseLocationDetails = () => {
    setShowLocationDetails(false);
    setSelectedLocationId(null);
  };

  const handleAddRequiredOccupancy = (newOccupancy) => {
    const newId = Math.max(...requiredOccupancy.map(r => r.id), 0) + 1;
    setRequiredOccupancy([...requiredOccupancy, { ...newOccupancy, id: newId }]);
  };

  const handleScheduleShift = (newShift) => {
    const newId = Math.max(...scheduledShifts.map(s => s.id), 0) + 1;
    setScheduledShifts([...scheduledShifts, { ...newShift, id: newId }]);
  };

  const handleUpdateActualOccupancy = (newOccupancy) => {
    setActualOccupancy(prevOccupancy => {
      const newId = Math.max(...prevOccupancy.map(a => a.id), 0) + 1;
      return [...prevOccupancy, { ...newOccupancy, id: newId }];
    });
  };

  const selectedLocation = locations.find(loc => loc.id === selectedLocationId);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <OfflineIndicator />
        <Navigation activeView={activeView} onViewChange={setActiveView} />
        
        <main className="main-content">
          {activeView === 'dashboard' && (
            <Dashboard
              locations={locations}
              requiredOccupancy={requiredOccupancy}
              scheduledShifts={scheduledShifts}
              actualOccupancy={actualOccupancy}
              onLocationSelect={handleLocationSelect}
            />
          )}

          {activeView === 'map' && (
            <MapView
              locations={locations}
              requiredOccupancy={requiredOccupancy}
              scheduledShifts={scheduledShifts}
              actualOccupancy={actualOccupancy}
              onLocationClick={handleLocationSelect}
              selectedLocationId={selectedLocationId}
            />
          )}

          {activeView === 'tracking' && (
            <OccupancyTracking
              locations={locations}
              personnel={personnel}
              scheduledShifts={scheduledShifts}
              actualOccupancy={actualOccupancy}
              onUpdateActualOccupancy={handleUpdateActualOccupancy}
            />
          )}
        </main>

        {showLocationDetails && selectedLocation && (
          <LocationDetails
            location={selectedLocation}
            requiredOccupancy={requiredOccupancy}
            scheduledShifts={scheduledShifts}
            actualOccupancy={actualOccupancy}
            personnel={personnel}
            onClose={handleCloseLocationDetails}
            onAddRequiredOccupancy={handleAddRequiredOccupancy}
            onScheduleShift={handleScheduleShift}
            onUpdateActualOccupancy={handleUpdateActualOccupancy}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
