import React from 'react';

import Select from './Select';
import AsyncButton from './AsyncButton';
import Input from './Input';

import options from '../ui/donations';

const DonationMethodForm = ({}) => {
  return (
     <div className='DonationMethodForm'>
      <form
        name='donation'
        className='DonationMethodForm-form'
        onSubmit={handleSubmit.bind(this)} >
        <div className='DonationMethodForm-label'>
          Select from the list
        </div>

        <Select
          options={options}
          value={options[0]}
          handleChange={handleMethod.bind(this)}
          customClass='DonationMethodForm-select' />

        <Input
          placeholder='PayPal email'
          customClass='DonationMethodForm-input'
          handleChange={(val) => console.log(val)} />

        <div className='DonationMethodForm-buttonContainer'>
          <AsyncButton
            customClass='Button--add DonationMethodForm-addButton'>
            Add
          </AsyncButton>
        </div>
      </form>
    </div>
  );
}

export function handleMethod(value) {
  console.log('value', value);
}

export function handleSubmit(submit) {
  console.log('submit', submit);
}

export default DonationMethodForm;
