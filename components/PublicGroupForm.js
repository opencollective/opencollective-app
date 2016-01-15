import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import formatCurrency from '../lib/format_currency';

import DonationPicker from './DonationPicker';
import SubTitle from './SubTitle';
import AsyncButton from './AsyncButton';

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
  interval
}) => {
  
  const intervalHuman = interval === 'none' ? '' : `per ${interval}`;
  const stripeDescription = `${formatCurrency(amount, 'USD')} ${intervalHuman}`

  return (
    <div className='PublicGroupForm'>
      <SubTitle text='Make your donation' />
      <DonationPicker
        value={amount}
        interval={interval}
        setDonationAmount={amount => appendDonationForm({amount})}
        selected={amount}
        isCustomMode={isCustomMode}
        setDonationCustom={setDonationCustom} />

      <StripeCheckout
        token={onToken}
        stripeKey={stripeKey}
        name={group.name}
        amount={stripeAmount}
        description={stripeDescription}>
        <div className='u-center'>
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
