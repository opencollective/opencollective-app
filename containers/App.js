import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import { decodeJWT } from '../actions/session';

class App extends Component {
  componentWillMount() {
    const { decodeJWT, pushState } = this.props;
    var infos = decodeJWT();
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
  decodeJWT,
  pushState
})(App);
