import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import RadioGroup from 'react-radio-group';

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

  return (
    <div className='PublicGroupForm'>
      <SubTitle text='Make your donation' />
      <DonationPicker
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
                  <span className='PublicGroupForm-radioLabel'>{label}</span>
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
