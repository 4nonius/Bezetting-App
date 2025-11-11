import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { STATUS_COLORS, calculateLocationStatus } from '../utils/data';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker component with status color
const StatusMarker = ({ location, status, isSelected, onClick }) => {
  const statusColor = status ? STATUS_COLORS[status] : '#CCCCCC';
  
  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${statusColor};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: ${isSelected ? '4px solid #2c3e50' : '3px solid white'};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: transform 0.2s;
      ">
        ${location.id}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  return (
    <Marker
      position={[location.coordinates.lat, location.coordinates.lng]}
      icon={customIcon}
      eventHandlers={{
        click: () => onClick(location.id),
      }}
    >
      <Popup>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {location.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Locatie #{location.id}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {location.coordinates.lat.toFixed(6)}, {location.coordinates.lng.toFixed(6)}
          </Typography>
        </Box>
      </Popup>
    </Marker>
  );
};

// Component to handle map center updates
const MapCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const MapView = ({
  locations,
  requiredOccupancy,
  scheduledShifts,
  actualOccupancy,
  onLocationClick,
  selectedLocationId
}) => {
  const [currentTime] = useState(new Date());
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([51.069, 4.500]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = [position.coords.latitude, position.coords.longitude];
          setUserLocation(userPos);
          setMapCenter(userPos);
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }
  }, []);

  const getLocationStatus = (locationId) => {
    return calculateLocationStatus(
      locationId,
      requiredOccupancy,
      scheduledShifts,
      actualOccupancy,
      currentTime
    );
  };

  const getClosestLocation = () => {
    if (!userLocation) return null;

    let closest = null;
    let minDistance = Infinity;

    locations.forEach(location => {
      const distance = Math.sqrt(
        Math.pow(location.coordinates.lat - userLocation[0], 2) +
        Math.pow(location.coordinates.lng - userLocation[1], 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closest = location;
      }
    });

    return closest;
  };

  const closestLocation = getClosestLocation();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Locatie Overzicht
        </Typography>
        {closestLocation && (
          <Paper sx={{ p: 2, mt: 2, bgcolor: 'success.light' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon />
              <Typography>
                Dichtstbijzijnde locatie: <strong>{closestLocation.name}</strong>
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>

      <Paper sx={{ overflow: 'hidden', mb: 3 }}>
        <Box sx={{ height: '600px', width: '100%' }}>
          <MapContainer
            center={mapCenter}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userLocation && (
              <Marker position={userLocation}>
                <Popup>
                  <Typography variant="subtitle2">Uw locatie</Typography>
                </Popup>
              </Marker>
            )}
            {locations.map(location => {
              const status = getLocationStatus(location.id);
              const isSelected = selectedLocationId === location.id;
              
              return (
                <StatusMarker
                  key={location.id}
                  location={location}
                  status={status}
                  isSelected={isSelected}
                  onClick={onLocationClick}
                />
              );
            })}
            <MapCenter center={mapCenter} />
          </MapContainer>
        </Box>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Klik op een marker om locatiedetails te bekijken
        </Typography>
      </Paper>
    </Container>
  );
};

export default MapView;
