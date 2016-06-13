import React from 'react';
import GroupLink from './GroupLink';
import ExpenseList from './ExpenseList';

export default (props) => {
  return (
    <div>
      <GroupLink {...props} />
      <ExpenseList
        expenses={props.expenses}
        users={props.users} />
    </div>
  );
}
