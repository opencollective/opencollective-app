import React, { Component } from 'react';

class App extends Component {
  render () {
    return (
      <div>
        Cool app
        {this.props.children}
      </div>
    )
  }
}

export default App;
