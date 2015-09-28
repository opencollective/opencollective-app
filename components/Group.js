import React, { Component } from 'react';

class Group extends Component {
  render() {
    const name = this.props.name;
    return (
      <div>
        <h4>{name}</h4>
      </div>
    );
  }
}

export default Group;
