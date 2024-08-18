import React from 'react';
import WeatherOption from './WeatherOption';
import { faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';

const index = ({ weather }) => {
  const temperature = {
    celcius: Math.floor(weather?.main.temp),
    fahrenheit: Math.floor(weather?.main.temp * 1.8 + 32),
  };

  return (
    <div className='weather-info-container'>
      <span className='weather-type'>{weather?.weather[0].main}</span>

      {/* temperature */}
      <div className='weather-temp-container'>
        <span className='weather-temp'>{temperature.celcius}</span>
        <span className='weather-temp-type'>°C / </span>
        <span className='weather-temp'>{temperature.fahrenheit}</span>
        <span className='weather-temp-type'>°F</span>
      </div>

      {/* wind speed */}
      <WeatherOption icon={faWind} option={` ${weather?.wind.speed} km/h`} />

      {/* & rain/1h */}
      {weather?.rain && (
        <WeatherOption icon={faDroplet} option={` ${weather.rain['1h']} %`} />
      )}
    </div>
  );
};

export default index;
