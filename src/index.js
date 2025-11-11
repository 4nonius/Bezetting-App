import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'leaflet/dist/leaflet.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for offline functionality
serviceWorkerRegistration.register({
    onSuccess: () => {
        console.log('Service Worker registered successfully. App is ready for offline use.');
    },
    onUpdate: (registration) => {
        console.log('New service worker available. Reload to update.');
        // Optionally show update notification to user
        if (window.confirm('Nieuwe versie beschikbaar. Herlaad de pagina?')) {
            registration.waiting?.postMessage({type: 'SKIP_WAITING'});
            window.location.reload();
        }
    }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
