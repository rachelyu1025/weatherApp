import React from 'react';

const SelectBox = (props) => {
  const { city, onChange } = props;

  const selectList = [
    { value: 'Seoul', name: 'Seoul' },
    { value: 'Sydney', name: 'Sydney' },
    { value: 'NewYork', name: 'NewYork' },
    { value: 'Paris', name: 'Paris' },
  ];

  return (
    <select className='selectbox' value={city} onChange={onChange}>
      {selectList.map((li) => (
        <option value={li.value} key={li.value}>
          {li.name}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
