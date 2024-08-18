import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import Select from './components/Select';
import WeatherImage from './components/WeatherImage';
import DateBox from './components/DateBox';
import WeatherInfo from './components/WeatherInfo';

function App() {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState(null);

  // 현재 위치정보에 따른 날씨 정보 호출 함수
  const getWeatherByCurrLocation = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url).then((res) => res.data);

    setWeather((prev) => response);
  };

  // 현재 위치정보 호출 함수
  const getCurrLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // 현재 날씨 호출
      getWeatherByCurrLocation(latitude, longitude);
    });
  }, []);

  useEffect(() => {
    if (city) {
      getWeatherByCurrLocation(city.lat, city.lon);
    } else {
      getCurrLocation();
    }
  }, [getCurrLocation, city]);

  return (
    <div className='container'>
      <div className='header'>
        <DateBox />

        <Select city={city} setCity={setCity} />
      </div>

      <WeatherImage mainState={weather?.weather[0].main} />

      <WeatherInfo weather={weather} />
    </div>
  );
}

export default App;
