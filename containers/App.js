import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import { loadUserInfo } from '../actions/users';

class App extends Component {
  componentWillMount() {
    const { loadUserInfo, pushState } = this.props;
    var infos = loadUserInfo();
    if (infos.redirectTo) {
      pushState(null, infos.redirectTo);
    }
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
    router: store.router
  };
}, {
  loadUserInfo,
  pushState
})(App);
