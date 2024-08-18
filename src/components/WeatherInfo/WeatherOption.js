import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WeatherOption = ({ icon, option }) => {
  return (
    <div>
      <FontAwesomeIcon icon={icon} />
      <span>{option}</span>
    </div>
  );
};

export default WeatherOption;
