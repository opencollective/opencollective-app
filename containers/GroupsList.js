import React, { Component } from 'react';
import values from 'lodash/object/values';
import Header from '../components/Header';
import Group from '../components/Group';

class GroupsList extends Component {

  render() {
    const { groups } = this.props;
    const groupsNode = values(groups).map((group) => {
      return <Group {...group} key={group.id} />;
    });

    return (
      <div>
        <Header title="My Groups" />
        {groupsNode}
      </div>
    );
  }

  componentDidMount() {
    const { fetchGroupsFromUser } = this.props;
    fetchGroupsFromUser('1');
  }
}

export default GroupsList;
