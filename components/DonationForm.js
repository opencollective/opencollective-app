import React from 'react';

import DonationPicker from './DonationPicker';
import Select from './Select';
import AsyncButton from './AsyncButton';

const DonationForm = ({
  group,
  setDonationAmount,
  amount,
  isCustomMode,
  setDonationCustom,
  user
}) => {
  const options = [`Paypal (${user.paypalEmail})`];

  return (
     <div className='DonationForm'>
      {header(group)}

      <div className='DonationForm-title'>Make your donation</div>

      <DonationPicker
        setDonationAmount={setDonationAmount}
        selected={amount}
        isCustomMode={isCustomMode}
        setDonationCustom={setDonationCustom} />

      <div className='DonationForm-subtitle'>Your payment method</div>

      <Select
        options={options}
        value={options[0]}
        handleChange={handleMethod.bind(this)}
        customClass='DonationForm-select' />

      <div className='DonationForm-buttonContainer'>
        <AsyncButton color='green' customClass='DonationForm-button'>
          Donate
        </AsyncButton>
      </div>
    </div>
  );
}

function header(group) {
  return (
    <div className='DonationForm-header'>
      <div className='DonationForm-name'>{group.name}</div>
      <div className='DonationForm-description'>{group.description}</div>
    </div>
  );
}

function handleMethod(value) {
  console.log('value', value);
}

export default DonationForm;
