import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import decodeJWT from '../actions/session/decode_jwt';

class App extends Component {
  componentWillMount() {
    const { decodeJWT, pushState } = this.props;
    const { redirectTo } = decodeJWT();

    if (redirectTo) {
      pushState(null, redirectTo);
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

export default connect(mapStateToProps, {
  decodeJWT,
  pushState
})(App);

function mapStateToProps() {
  return {};
}
