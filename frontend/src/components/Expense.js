import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import Currency from './Currency';
import ExpenseStatus from './ExpenseStatus';
import ProfilePhoto from './ProfilePhoto';

class Expense extends Component {
  render() {
    const {
      amount,
      currency,
      title,
      id,
      GroupId,
      incurredAt,
      user,
      status
    } = this.props;

    return (
      <div className='Expense'>
        <Link to={`/groups/${GroupId}/expenses/${id}`}>
          <ProfilePhoto url={user && user.avatar} />
          <div className='Expense-info'>
            <div className='Expense-created'>
              {incurredAt ? moment(incurredAt).fromNow() : ''}
            </div>
            <div className='Expense-title'>{title}</div>
            <div className='Expense-status'>
              <div className='Expense-amount'><Currency value={amount} currency={currency} precision={2} /></div>
              <div className='Expense-approved'>
                <ExpenseStatus status={status} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

Expense.propTypes = {
  id: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired
};

export default Expense;
