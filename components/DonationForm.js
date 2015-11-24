import React from 'react';
import { Link } from 'react-router';

import DonationPicker from './DonationPicker';
import Input from './Input';
import AsyncButton from './AsyncButton';
import Select from './Select';

const DonationForm = ({
  group,
  appendDonationForm,
  amount,
  isCustomMode,
  setDonationCustom,
  donate,
  user,
  groupid
}) => {
  const options = [`Paypal (${user.paypalEmail})`];

  return (
     <div className='DonationForm'>
      {header(group)}

      <div className='DonationForm-title'>Make your donation</div>

      <DonationPicker
        setDonationAmount={(amount) => appendDonationForm({amount})}
        selected={amount}
        isCustomMode={isCustomMode}
        setDonationCustom={setDonationCustom} />

      <div className='DonationForm-subtitle'>
        Your payment method
        <Link
          to={`/groups/${groupid}/donation/method`}
          className='DonationForm-addNew'>
          Add new
        </Link>
      </div>

      <Select
        options={options}
        value={options[0]}
        handleChange={handleMethod.bind(this)}
        customClass='DonationForm-select' />

      <div className='DonationForm-subtitle'>
        Description
      </div>

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

function handleMethod(value) {
  console.log('Select', value);
}

export default DonationForm;
