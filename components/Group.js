import React, { Component, PropTypes } from 'react';
import GroupLink from './GroupLink';
import TransactionsList from './TransactionsList';

class Group extends Component {
  propTypes: {
    id: PropTypes.string.isRequired
  }

  render() {
    const { id } = this.props;

    return (
      <div>
        <GroupLink {...this.props} />
        <TransactionsList groupid={id} {...this.props} />
      </div>
    );
  }
}

export default Group;
