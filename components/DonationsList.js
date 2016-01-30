import React from 'react';
import Icon from './Icon';
import TransactionItem from './TransactionItem';

export default ({donations, users}) => {
  if (donations.length === 0) {
    return (
      <div className='PublicGroup-emptyState'>
        <div className='PublicGroup-donationIcon'>
          <Icon type='revenue' />
        </div>
        <label>
          All your latest donations will show up here
        </label>
      </div>
    );
  }

  return (
    <div>
    {donations.map(donation => <TransactionItem key={donation.id}
                                              transaction={donation}
                                              user={users[donation.UserId]} />)}
    </div>
    );
}
