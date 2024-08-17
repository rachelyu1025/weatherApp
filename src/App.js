import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [weather, setWeather] = useState();

  // 현재 위치정보에 따른 날씨 정보 호출 함수
  const getWeatherByCurrLocation = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
    const response = await axios.get(url).then((res) => res.data);

    setWeather((prev) => response);
  };

  // 현재 위치정보 호출 함수
  const getCurrLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setCurrentLocation((prev) => ({
        latitude,
        longitude,
      }));

      // 현재 날씨 호출
      getWeatherByCurrLocation(latitude, longitude);
    });
  };

  useEffect(() => {
    getCurrLocation();
  }, []);

  return <div className='container'></div>;
}

export default App;
