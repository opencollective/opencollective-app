import React, { Component } from 'react';

class Avatar extends Component {
  render() {
    const url = 'http://api.randomuser.me/portraits/women/39.jpg';
    return (
      <span>
        <img src={url} className='Avatar' />
      </span>
    );
  }
}

export default Avatar;
