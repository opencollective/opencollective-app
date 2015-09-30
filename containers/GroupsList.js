import React, { Component } from 'react';
import Group from '../components/Group';

class GroupsList extends Component {

  render() {
    // const groups = initialState.map((group) => {
    //   return <Group {...group} key={group.id} />;
    // });
    const {groups} = this.props;
    console.log('props', this.props);
    return (
      <div>
        <h4>Groups</h4>
      </div>
    );
  }

  componentDidMount() {
    this.setState({groups: initialState});
  }

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }
}

export default GroupsList;
