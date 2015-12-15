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
  user,
  groupid
}) => {
  
  // xdamman: this sucks. 
  // 1. `user.cards` should be an array and not an object with the cardid as an index
  // 2. this logic should probably not be here, @arnaudbenard: where should I put this?
  // 3. we should rename `card.number` to `card.label` (we should never store the entire credit card number)
  let options = [];
  for(let id in user.cards) {
    let card = user.cards[id];
    options.push(card.service + ' (' + card.number + ')');
    user.organizationPaypalEmail = card.number;
  }
  
  return (
     <div className='DonationForm'>
      {header(group)}

      <SubTitle text='Make your donation' />

      <DonationPicker
        setDonationAmount={(amount) => appendDonationForm({amount})}
        selected={amount}
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
        options={options}
        value={options[0]}
        handleChange={handleMethod.bind(this)}
        customClass='DonationForm-select' />

      <div className='DonationForm-bold'>
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
