import React, { Component } from 'react';
import Group from '../components/Group';

const initialState = [
  {
    id: 1,
    name: 'Scouts d\'Arlon',
    description: 'Troupe Scoute Albert Schweitzer',
    budget: 10000.00,
    'membership_type': 'yearlyfee',
    membershipfee: 10,
  },
];

class GroupsList extends Component {
  constructor(props) {
    super(props);
    this.state = {groups: []};
  }

  render() {
    const groups = initialState.map((group) => {
      return <Group {...group} key={group.id} />;
    });
    return (
      <div>
        <h4>Groups</h4>
        {groups}
      </div>
    );
  }

  componentDidMount() {
    this.setState({groups: initialState});
  }
}

export default GroupsList;
