import React from 'react';

const index = ({ mainState }) => {
  const weatherState = {
    sunny: ['clear', 'dust'],
    clouds: ['clouds', 'smoke', 'fog', 'sand', 'ash', 'haze'],
    rain: ['rain', 'drizzle', 'mist'],
    snow: ['snow'],
    thunderstorm: ['thunderstorm', 'tornado', 'squall'],
  };

  const state = Object.keys(weatherState).find((key) => {
    const main = mainState?.toLowerCase();
    return weatherState[key].includes(main);
  });

  return (
    <div className='image-container'>
      <img src={`/assets/${state}.jpeg`} alt='' className='image' />
    </div>
  );
};

export default index;
