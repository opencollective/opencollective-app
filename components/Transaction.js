import React, { Component } from 'react';
import { Link } from 'react-router';
import Currency from './Currency';

class Transaction extends Component {
  render() {
    const {amount, description, id, groupid} = this.props;
    const url = `/groups/${groupid}/transactions/${id}`;

    return (
      <div className='Transaction'>
        <Link to={url}>
          <span className='Transaction-image'>
          </span>
          <span className='Transaction-description'>
            {description}
          </span>
          <span className='Transaction-amount'>
            <Currency value={amount} />
          </span>
        </Link>
      </div>
    );
  }
}

export default Transaction;
