import React from 'react';

const SelectBox = ({ city, setCity, current }) => {
  const selectList = [
    {
      value: 'Seoul',
      name: 'Seoul',
      lat: '37.532600',
      lon: '127.024612',
    },
    {
      value: 'Sydney',
      name: 'Sydney',
      lat: '-33.865143',
      lon: '151.209900',
    },
    {
      value: 'NewYork',
      name: 'NewYork',
      lat: '40.73061',
      lon: '-73.935242',
    },
    {
      svalue: 'Paris',
      name: 'Paris',
      lat: '48.864716',
      lon: '2.349014',
    },
  ];

  const handleSelect = (e) => {
    const target = e.target.value;
    const findCity = selectList.findIndex((obj) => obj.name === target);

    setCity(selectList[findCity]);
  };

  return (
    <select
      className='selectbox'
      value={city ? city.name : ''}
      onChange={handleSelect}
      defaultValue={''}
    >
      <option value={''} disabled>
        {city === null && current ? current : ''}
      </option>

      {selectList.map((li, idx) => (
        <option value={li.value} key={idx}>
          {li.name}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
