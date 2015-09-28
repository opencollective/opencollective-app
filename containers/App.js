import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Header from '../components/Header';
import GroupTransactions from './GroupTransactions';
import { fetchGroup } from '../actions';

class App extends Component {
  render() {
    const { dispatch, groups } = this.props;
    const group = groups[0];

    return (
      <div>
        <Header title='Application' />
        <GroupTransactions group={group} onLoad={ id =>
          dispatch(fetchGroup(id))
        }/>
      </div>
    );
  }
}

export default connect(function(store) {
  return {
    groups: store.groups
  }
})(App);
