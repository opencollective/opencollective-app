import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import RadioGroup from 'react-radio-group';

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

  const intervalHuman = interval === 'none' ? '' : `per ${interval}`;
  const stripeDescription = `${formatCurrency(amount, 'USD')} ${intervalHuman}`

  return (
    <div className='PublicGroupForm'>
      <SubTitle text='Make your donation' />
      <DonationPicker
        value={amount}
        setDonationAmount={amount => appendDonationForm({amount})}
        selected={amount}
        isCustomMode={isCustomMode}
        setDonationCustom={setDonationCustom} />
      <div className='u-bold u-py1'>Donation frequency</div>
      <RadioGroup
        name='interval'
        selectedValue={interval}
        onChange={interval => appendDonationForm({interval})}>
        {Radio => (
          <div>
            {intervals.map(({label, value}) => {
              return (
                <label>
                  <Radio value={value} key={value} />
                  <span className='u-px05'>{label}</span>
                </label>
              );
            })}
          </div>
        )}
      </RadioGroup>

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
