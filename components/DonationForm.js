import React from 'react';
import { Link } from 'react-router';

import DonationPicker from './DonationPicker';
import Input from './Input';
import AsyncButton from './AsyncButton';
import SubTitle from './SubTitle';
import Select from './Select';

const DonationForm = ({
  group,
  appendDonationForm,
  amount,
  isCustomMode,
  setDonationCustom,
  donate,
  userCardsLabels,
  groupid,
  description
}) => {

  return (
     <div className='DonationForm'>
      {header(group)}

      <SubTitle text='Make your donation' />

      <DonationPicker
        setDonationAmount={(amount) => appendDonationForm({amount})}
        selected={amount}
        value={amount}
        isCustomMode={isCustomMode}
        setDonationCustom={setDonationCustom} />

      <div className='DonationForm-bold'>
        Your payment method
        <Link
          to={`/groups/${groupid}/donation/method`}
          className='DonationForm-addNew'>
          Add new
        </Link>
      </div>

      <Select
        options={userCardsLabels}
        value={userCardsLabels[0]}
        handleChange={handleMethod.bind(this)}
        customClass='DonationForm-select' />

      <div className='DonationForm-bold'>
        Description
      </div>

      <Input
        placeholder='Description'
        customClass='Input--fullwidth'
        value={description}
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
