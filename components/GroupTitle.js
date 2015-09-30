import React, { Component } from 'react';
import BackButton from './BackButton';
import Currency from './Currency';

class GroupTitle extends Component {
  render() {
    const {group} = this.props;

    return (
      <div className='border-bottom px2 py3 bold bg-silver'>
        Available budget
        <span className='right'>
          <Currency value={group.budgetLeft} />
        </span>
      </div>
    );
  }
}

export default GroupTitle;
