import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';
import Select from './components/Select';
import WeatherImage from './components/WeatherImage';

function App() {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState(null);

  const temperature = {
    celcius: Math.floor(weather?.main.temp),
    fahrenheit: Math.floor(weather?.main.temp * 1.8 + 32),
  };

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

  const date = new Date();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const today = `${date.getDate()} ${monthNames[date.getMonth()]}`;

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
        <span className='today'>{`Today ${today}`}</span>

        <Select city={city} setCity={setCity} />
      </div>

      <WeatherImage mainState={weather?.weather[0].main} />

      {/* weather Info */}
      <div className='weather-info-container'>
        <span className='weather-type'>{weather?.weather[0].main}</span>

        {/* temperature */}
        <div className='weather-temp-container'>
          <span className='weather-temp'>{temperature.celcius}</span>
          <span className='weather-temp-type'>°C / </span>
          <span className='weather-temp'>{temperature.fahrenheit}</span>
          <span className='weather-temp-type'>°F</span>
        </div>

        {/* wind speed & rain/1h */}
        <div>
          <FontAwesomeIcon icon={faWind} />
          <span>{` ${weather?.wind.speed} km/h`}</span>
        </div>
        {weather?.rain && (
          <div>
            <FontAwesomeIcon icon={faDroplet} />
            <span>{` ${weather.rain['1h']} %`}</span>
          </div>
        )}
        {/* 풍량, 강수량 */}
      </div>
    </div>
  );
}

export default App;
