import React, { Component } from 'react';

class Header extends Component {
  render() {
    const title = this.props.title || 'Header';
    return (
      <div className="border-bottom center py2">
        <span>{title}</span>
      </div>
    );
  }
}

export default Header;
