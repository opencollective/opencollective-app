import React, { Component } from 'react';
import GroupLink from './GroupLink';
import TransactionsList from './TransactionsList';

class Group extends Component {
  render() {
    const { name, transactions, id } = this.props;
    return (
      <div>
        <GroupLink {...this.props} />
        <TransactionsList groupid={id} {...this.props} />
      </div>
    );
  }
}

export default Group;
