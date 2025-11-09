import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Snackbar
      open={showNotification}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={isOnline ? 3000 : null}
      onClose={() => setShowNotification(false)}
    >
      <Alert
        severity={isOnline ? 'success' : 'warning'}
        icon={isOnline ? <CheckCircleIcon /> : <WarningIcon />}
        onClose={() => setShowNotification(false)}
        sx={{ minWidth: 300 }}
      >
        {isOnline ? 'Verbinding hersteld' : 'Geen internetverbinding - Offline modus actief'}
      </Alert>
    </Snackbar>
  );
};

export default OfflineIndicator;
