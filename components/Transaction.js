import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import Currency from './Currency';
import TransactionStatus from './TransactionStatus';
import Avatar from './Avatar';

class Transaction extends Component {
  propTypes: {
    groupid: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
  }

  render() {
    const {amount, description, id, GroupId, createdAt} = this.props;
    const url = `/groups/${GroupId}/transactions/${id}`;
    const date = createdAt ? moment(createdAt).fromNow() : '';

    return (
      <div className='Transaction'>
        <Link to={url}>
          <Avatar />
          <div className='Transaction-info'>
            <div className='Transaction-created'>{date}</div>
            <div className='Transaction-description'>{description}</div>
            <div className='Transaction-status'>
              <div className='Transaction-amount'><Currency value={amount} /></div>
              <div className='Transaction-approved'><TransactionStatus {...this.props} /></div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default Transaction;
