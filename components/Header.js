import React, { Component } from 'react';

class Header extends Component {
  render() {
    const title = this.props.title || 'Header';
    return (
      <div>
        <h3>{title}</h3>
      </div>
    );
  }
}

export default Header;
