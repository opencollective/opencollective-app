import React from 'react';
import Icon from './Icon';
import exportFile from '../lib/export_file';

export default({props}) => {
  if (props.isHost) {
    return (
      <span className="ExportTransactionsButton" onClick={exportTransactions.bind(null, props)}>
      <Icon type='down'/>Export
    </span>
    );
  }
  return <span/>;
}

export function exportTransactions(props) {
  var user, text = "createdAt,description,amount,currency,vat,tags,status,link,userName,userEmail\n";
  props.transactions.forEach(transaction => {
    user = props.users[transaction.UserId];
    text += toStr(transaction.createdAt) + ',' +
      toStr(transaction.description) + ',' +
      toStr(transaction.amount) + ',' +
      toStr(transaction.currency) + ',' +
      toStr(transaction.vat) + ',' +
      toStr(transaction.tags) + ',' +
      toStr(transaction.status) + ',' +
      toStr(transaction.link) + ',' +
      toStr(user.name) + ',' +
      toStr(user.email) + '\n';
  });

  exportFile('text/plain;charset=utf-8', 'transactions.csv', text);
}

var toStr = function(text) {
  return text ? text : '';
};
