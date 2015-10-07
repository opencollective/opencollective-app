import React, { Component } from 'react';
import { Link } from 'react-router';
import Currency from './Currency';

class GroupTitle extends Component {
  render() {
    const {id, name, budgetLeft} = this.props;
    const url = `/groups/${id}/transactions/`;

    return (
      <div className='Well GroupLink'>
        <Link to={url}>
          <span className='GroupLink-name'>
            {name}
          </span>
          <span className='GroupLink-balance'>
            <Currency value={budgetLeft} /> &#8250;
          </span>
        </Link>
      </div>
    );
  }
}

export default GroupTitle;
