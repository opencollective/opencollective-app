import React, { Component } from 'react';
import { connect } from 'react-redux';

export class App extends Component {
  render() {
    return (
      <div className='App'>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps , {})(App);

export function mapStateToProps() {
  return {};
}
