import React, { Component } from 'react';
import BackButton from './BackButton';

class GroupTitle extends Component {
  render() {
    const {group} = this.props;

    return (
      <div className='border-bottom px2 py2 bold'>
        {group.name} <span className='right'> {group.budgetLeft} / {group.budget}</span>
      </div>
    );
  }
}

export default GroupTitle;
