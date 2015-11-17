import React from 'react';
import classnames from 'classnames';

import Currency from './Currency';
import Input from './Input';

export default ({selected, isCustomMode, setDonationCustom, setDonationAmount}) => {
  const values = [5, 50, 100, 'custom'];

  return (
    <div className='DonationPicker'>
      {values.map((value) => {
        return (
          <span
            className={className(selected, value, isCustomMode)}
            key={value}
            onClick={() => handleClick({value, setDonationCustom, setDonationAmount})}>
            {value === 'custom' ? 'Custom' : <Currency value={value} />}
          </span>
        );
      })}
      {isCustomMode ? input({setDonationAmount}) : null}
    </div>
  );
};

function input({setDonationAmount}) {
  return (
    <Input
      placeholder='Enter your custom amount'
      customClass='DonationPicker-input'
      handleChange={(val) => setDonationAmount(val)} />
  );
}

function handleClick({value, setDonationCustom, setDonationAmount}) {
  if (value === 'custom') {
    setDonationCustom(true);
  } else {
    setDonationCustom(false);
    setDonationAmount(value);
  }
}

function className(selected, value, isCustomMode) {
  const same = selected === value;
  console.log('call', selected, value, isCustomMode);
  return classnames({
    'DonationPicker-amount': true,
    'DonationPicker-amount--selected': same || (same && isCustomMode)
  });
}
