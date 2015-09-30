import React, { Component } from 'react';
import { Link } from 'react-router';

class Transaction extends Component {
  render() {
    const {amount, description, id, groupid} = this.props;
    const url = `/groups/${groupid}/transactions/${id}`;
    return (
      <li>
        <Link to={url}>
        <div className='border-bottom py2 px2'>
          {description} <span className='right'>{amount}</span>
        </div>
        </Link>
      </li>
    );
  }
}

export default Transaction;
