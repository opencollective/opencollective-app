import React, { Component } from 'react';
import { Link } from 'react-router';
import BackButton from './BackButton';

class GroupTitle extends Component {
  render() {
    const {id, name, budget, budgetLeft} = this.props;
    const url = `/groups/${id}/transactions/`;
    return (
      <div className='border-bottom px2 py2 bold bg-silver'>
        <Link to={url}>
          {name} <span className='right'> Balance($): {budget} &#8250;</span>
        </Link>
      </div>
    );
  }
}

export default GroupTitle;
