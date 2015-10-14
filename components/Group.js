import React, { Component, PropTypes } from 'react';
import GroupLink from './GroupLink';
import TransactionsList from './TransactionsList';

class Group extends Component {
  propTypes: {
    id: PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        <GroupLink {...this.props} />
        <TransactionsList
          {...this.props}
          groupid={this.props.id} />
      </div>
    );
  }
}

export default Group;
