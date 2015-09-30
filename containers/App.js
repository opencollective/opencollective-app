import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
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
