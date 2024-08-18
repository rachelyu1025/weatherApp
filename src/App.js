import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import Select from './components/Select';
import WeatherImage from './components/WeatherImage';
import DateBox from './components/DateBox';
import WeatherInfo from './components/WeatherInfo';
import { FadeLoader } from 'react-spinners';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [weather, setWeather] = useState();
  const [city, setCity] = useState(null);

  // 현재 위치정보에 따른 날씨 정보 호출 함수
  const getWeatherByCurrLocation = async (lat, lon) => {
    setIsLoading((prev) => true);

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
    const response = await axios
      .get(url)
      .then((res) => {
        setIsLoading((prev) => false);
        return res.data;
      })
      .catch((error) => {
        setIsLoading((prev) => false);
        setIsError((prev) => true);
      });

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
    <div>
      <FadeLoader loading={isLoading} color={`skyblue`} speedMultiplier={1.5} />

      {isError ? (
        <div>
          <img
            className='error'
            src='./assets/404_error.png'
            alt='error page'
          />
        </div>
      ) : (
        !isLoading && (
          <div className='container'>
            <div className='header'>
              <DateBox />

              <Select city={city} setCity={setCity} current={weather?.name} />
            </div>

            <WeatherImage mainState={weather?.weather[0].main} />

            <WeatherInfo weather={weather} />
          </div>
        )
      )}
    </div>
  );
}

export default App;
