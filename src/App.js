import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import SelectBox from './components/SelectBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [weather, setWeather] = useState();
  const [city, setCity] = useState('');

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

  const handleSelect = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    getCurrLocation();
  }, []);

  return (
    <div className='container'>
      <div>
        <span className='today'>{`Today ${today}`}</span>

        <div className='selectbox-container'>
          <SelectBox city={city} onChange={handleSelect} />

          <button>Current</button>
        </div>
      </div>

      <div>
        <img src={`/assets/wind.jpeg`} alt='' className='image' />
      </div>

      <div className='weather-info-container'>
        <span>Sunny</span>
        <span>{`${Math.floor(weather?.main.temp - 273.15)}°`}</span>

        <div>
          <FontAwesomeIcon icon={faWind} />
          <span>{`${weather?.wind.speed}km/h`}</span>
        </div>
        {weather?.rain && (
          <div>
            <FontAwesomeIcon icon={faDroplet} />
            <span>{`${weather.rain}%`}</span>
          </div>
        )}
        {/* 풍량, 강수량 */}
      </div>
    </div>
  );
}

export default App;
