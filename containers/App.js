import React, { Component } from 'react';
import { Link } from 'react-router'

class App extends Component {
  render () {
    return (
      <div>
        App
        <ul>
          <li>Links</li>
          <li><Link to="/groups">Groups</Link></li>
          <li><Link to="/groups/1/transactions">Group 1 transactions</Link></li>
          <li><Link to="/groups/1/transactions/1">Group 1 transaction 1</Link></li>
          <li><Link to="/groups/1/transactions/new">Group 1 new transaction</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default App;
