import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUserInfo } from '../actions/users';

class App extends Component {
  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadUserInfo())
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(function(store) {
  return {
    groups: store.groups,
    transactions: store.transactions,
  };
})(App);
