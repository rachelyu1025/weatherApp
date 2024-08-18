import React from 'react';
import SelectBox from './SelectBox';

const Select = ({ city, setCity, current }) => {
  const handleCurrentBtn = () => {
    setCity((prev) => null);
  };

  return (
    <div className='selectbox-container'>
      <SelectBox city={city} setCity={setCity} current={current} />

      <button className='currentBtn' onClick={handleCurrentBtn}>
        Current
      </button>
    </div>
  );
};

export default Select;
