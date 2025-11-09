import React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Navigation = ({ activeView, onViewChange }) => {
  const handleChange = (event, newValue) => {
    onViewChange(newValue);
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ py: 2, px: { xs: 2, sm: 4 } }}>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 600,
            color: '#ffffff',
            fontSize: '1.25rem',
          }}
        >
          Bezetting App
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Tabs
            value={activeView}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{
              '& .MuiTab-root': {
                minWidth: 120,
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.9375rem',
                fontWeight: 500,
                textTransform: 'none',
                '&.Mui-selected': {
                  color: '#61dafb',
                  fontWeight: 600,
                },
                '&:hover': {
                  color: '#ffffff',
                },
              },
            }}
          >
            <Tab
              icon={<DashboardIcon />}
              iconPosition="start"
              label="Dashboard"
              value="dashboard"
            />
            <Tab
              icon={<MapIcon />}
              iconPosition="start"
              label="Kaart"
              value="map"
            />
            <Tab
              icon={<CheckCircleIcon />}
              iconPosition="start"
              label="Registreren"
              value="tracking"
            />
          </Tabs>
        </Box>
        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <Tabs
            value={activeView}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minWidth: 80,
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-selected': {
                  color: 'white',
                },
              },
            }}
          >
            <Tab icon={<DashboardIcon />} value="dashboard" />
            <Tab icon={<MapIcon />} value="map" />
            <Tab icon={<CheckCircleIcon />} value="tracking" />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
