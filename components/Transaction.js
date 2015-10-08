import React, { Component } from 'react';
import { Link } from 'react-router';
import Currency from './Currency';
import Avatar from './Avatar';

class Transaction extends Component {
  render() {
    const {amount, description, id, groupid, createdAt, approvedAt} = this.props;
    const url = `/groups/${groupid}/transactions/${id}`;

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
              10:15 PM
            </div>
            <div className='Transaction-approved'>
              Approved
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default Transaction;
