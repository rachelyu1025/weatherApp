import React from 'react';

const DateBox = () => {
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

  const date = new Date();

  const today = `${date.getDate()} ${monthNames[date.getMonth()]}`;

  return <span className='today'>{`Today ${today}`}</span>;
};

export default DateBox;
