import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const initLocation = {
    latitude: 0,
    longitude: 0,
  };

  const [currentLocation, setCurrentLocation] = useState(initLocation);

  const getCurrLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation((prev) => ({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }));
    });
  };

  useEffect(() => {
    getCurrLocation();
  }, []);

  return (
    <div>
      <div>
        current: {(currentLocation.latitude, currentLocation.longitude)}
      </div>
    </div>
  );
}

export default App;
