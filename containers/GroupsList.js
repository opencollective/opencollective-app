import React, { Component } from 'react';
import { connect } from 'react-redux';
import values from 'lodash/object/values';
import extend from 'lodash/object/extend';
import filter from 'lodash/collection/filter';
import { fetchUserGroupsAndTransactions } from '../actions/users';
import { fetchTransactions } from '../actions/transactions';
import Content from './Content';
import Header from '../components/Header';
import Group from '../components/Group';
import Footer from '../components/Footer';
import sortByDate from '../lib/sort_by_date';

class GroupsList extends Component {
  render() {
    return (
      <div>
        <Header title='Accounting' hasBackButton={false} />
        <Content>
        {this.props.groups.map(group => {
          return <Group {...group} transactions ={group.transactions} key={group.id} />
        })}
        </Content>
      </div>
    );
  }

  componentDidMount() {
    const { fetchUserGroupsAndTransactions, user } = this.props;
    if (user && user.id) {
      fetchUserGroupsAndTransactions(user.id);
    }
  }
}

export default connect(mapStateToProps, {
  fetchUserGroupsAndTransactions
})(GroupsList);

function mapStateToProps(state) {
  const groups = values(state.users.groups).map((group) => {
    const GroupId = group.id;
    const transactions = filter(state.users.transactions, { GroupId }).sort(sortByDate);
    return extend(group, { transactions });
  });

  return {
    groups,
    user: state.users.info,
  };
}
