import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroup } from '../actions';
import Transaction from '../components/Transaction';

class GroupTransactions extends Component {
  render() {
    const { group, transactions } = this.props;
    const name = group ? group.name : '';
    const transactionsNode = transactions.map((transaction) => {
      return <li key={transaction.id}><Transaction {...transaction} /></li>
    });
    return (
      <div>
        GroupTransactions <br/>
        {name}
        <ul>
          {transactionsNode}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad('1');
  }
}

export default GroupTransactions;
