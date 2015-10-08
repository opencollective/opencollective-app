import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import Currency from './Currency';
import TransactionStatus from './TransactionStatus';
import Avatar from './Avatar';

class Transaction extends Component {
  render() {
    const {amount, description, id, groupid, createdAt, approvedAt} = this.props;
    const url = `/groups/${groupid}/transactions/${id}`;
    const date = createdAt ? moment(createdAt).fromNow() : '';

    return (
      <div className='Transaction'>
        <Link to={url}>
          <Avatar />
          <div className='Transaction-info'>
            <div className='Transaction-description'>
              {description}
            </div>
            <div className='Transaction-amount'>
              <Currency value={amount} />
            </div>
          </div>
          <div className='Transaction-status'>
            <div className='Transaction-created'>
              {date}
            </div>
            <div className='Transaction-approved'>
              <TransactionStatus {...this.props} />
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default Transaction;
