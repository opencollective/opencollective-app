import React from 'react';
import Icon from './Icon';
import exportFile from '../lib/export_file';

export default({isHost, transactions, users}) => {
  if (isHost) {
    return (
      <span className="ExportTransactionsButton" onClick={exportTransactions.bind(null, transactions, users)}>
        <Icon type='down'/>Export
      </span>
    );
  }
  return <span/>;
}

const exportTransactions = function(transactions, users) {
  var user, text = "createdAt,description,amount,currency,vat,tags,status,link,userName,userEmail\n";
  transactions.forEach(transaction => {
    user = users[transaction.UserId];
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
};

const toStr = function(text) {
  return text ? text : '';
};
