import React from 'react';
import classnames from 'classnames';

import Currency from './Currency';
import Input from './Input';
import RadioGroup from 'react-radio-group';

export default ({selected, isCustomMode, setDonationCustom, setDonationAmount, value, interval}) => {
  const values = [5, 10, 50, 100, 'custom'];
  const intervals = [{
    label: 'Monthly',
    value: 'month'
  }, {
    label: 'Yearly',
    value: 'year'
  }, {
    label: 'One time',
    value: 'none'
  }];

  return (
    <div className='DonationPicker'>
      <ul className='DonationPicker-presets'>
        {values.map((value) => {
          return (
            <li
              className={className(selected, value, isCustomMode)}
              key={value}
              onClick={() => handleClick({value, setDonationCustom, setDonationAmount})}>
              <label>{value === 'custom' ? 'Custom' : <Currency value={value} />}</label>
            </li>
          );
        })}
      </ul>
      <div>
        {isCustomMode && input({setDonationAmount, value})}
      </div>
      <h2>Donation frequency</h2>
      <RadioGroup
        name='interval'
        selectedValue={interval}
        onChange={interval => appendDonationForm({interval})}>
        {Radio => (
          <ul className='DonationPicker-frequency'>
            {intervals.map(({label, value}) => {
              return (
                <li key={value}>
                  <label>
                    <Radio value={value} key={value} />
                    {label}
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </RadioGroup>
    </div>
  );
};

function input({setDonationAmount, value}) {
  return (
    <Input
      value={value}
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
  return classnames({
    'DonationPicker-amount': true,
    'DonationPicker-amount--selected': (selected === value) || (value === 'custom' && isCustomMode)
  });
}
