import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroup } from '../actions';

class GroupTransactions extends Component {
  render() {
    const { group } = this.props;
    return (
      <div>
        GroupTransactions <br/>
        {group ? group.name : ''}
      </div>
    );
  }

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad('1');
  }
}

export default GroupTransactions;
