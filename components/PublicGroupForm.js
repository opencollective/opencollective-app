import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import DonationPicker from '../components/DonationPicker';
import SubTitle from '../components/SubTitle';
import AsyncButton from '../components/AsyncButton';

const PublicGroupForm = ({
  group,
  amount,
  isCustomMode,
  setDonationCustom,
  appendDonationForm,
  onToken,
  stripeKey,
  stripeAmount,
  inProgress,
}) => {
  return (
    <div className='PublicGroupForm'>
      <SubTitle text='Make your donation' />
      <DonationPicker
        setDonationAmount={amount => appendDonationForm({amount})}
        selected={amount}
        isCustomMode={isCustomMode}
        setDonationCustom={setDonationCustom} />
      <StripeCheckout
        token={onToken}
        stripeKey={stripeKey}
        name={group.name}
        amount={stripeAmount}
        description={group.description}>
        <div className='PublicGroup-buttonContainer'>
          <AsyncButton
            color='green'
            inProgress={inProgress} >
            Donate
          </AsyncButton>
        </div>
      </StripeCheckout>
    </div>
  );
}

export default PublicGroupForm;
