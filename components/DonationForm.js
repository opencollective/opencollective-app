import React from 'react';

import DonationPicker from './DonationPicker';
import Input from './Input';
import AsyncButton from './AsyncButton';

const DonationForm = ({
  group,
  appendDonationForm,
  amount,
  isCustomMode,
  setDonationCustom,
  donate
}) => {

  return (
     <div className='DonationForm'>
      {header(group)}

      <div className='DonationForm-title'>Make your donation</div>

      <DonationPicker
        setDonationAmount={(amount) => appendDonationForm({amount})}
        selected={amount}
        isCustomMode={isCustomMode}
        setDonationCustom={setDonationCustom} />

      <div className='DonationForm-subtitle'>Description</div>

      <Input
        placeholder='Description'
        customClass='Input--fullwidth'
        handleChange={(description) => appendDonationForm({description})} />

      <div className='DonationForm-buttonContainer'>
        <AsyncButton
          color='green'
          customClass='DonationForm-button'
          onClick={donate}>
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

export default DonationForm;
