import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import contains from 'lodash/collection/contains';

import decodeJWT from '../actions/session/decode_jwt';

export class App extends Component {
  componentWillMount() {
    const {
      decodeJWT,
      pushState,
      needsLogin
    } = this.props;

    const { user } = decodeJWT();

    if (needsLogin && !user) {
      pushState(null, '/login');
    }
  }

  render() {
    return (
      <div className='App'>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  decodeJWT,
  pushState
})(App);

export function mapStateToProps({router}) {
  return {
    needsLogin: !contains(router.location.pathname, 'public')
  };
}
