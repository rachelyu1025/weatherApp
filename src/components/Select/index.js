import React from 'react';
import SelectBox from './SelectBox';

const Select = ({ city, setCity }) => {
  const handleCurrentBtn = () => {
    setCity((prev) => null);
  };

  return (
    <div className='selectbox-container'>
      <SelectBox city={city} setCity={setCity} />

      <button className='currentBtn' onClick={handleCurrentBtn}>
        Current
      </button>
    </div>
  );
};

export default Select;
