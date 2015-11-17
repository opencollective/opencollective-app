import React from 'react';

import DonationPicker from './DonationPicker';

const DonationForm = ({
  group,
  setDonationAmount,
  amount,
  isCustomMode,
  setDonationCustom
}) => {
  return (
     <div className='DonationForm'>
      <div className='DonationForm-header'>
        <div className='DonationForm-name'>{group.name}</div>
        <div className='DonationForm-description'>{group.description}</div>
      </div>
      <div className='DonationForm-title'>
        Make your donation
      </div>

      <DonationPicker
        setDonationAmount={setDonationAmount}
        selected={amount}
        isCustomMode={isCustomMode}
        setDonationCustom={setDonationCustom} />
    </div>
  );
}

export function handleChange(value) {
  console.log('value', value);
}


export default DonationForm;
