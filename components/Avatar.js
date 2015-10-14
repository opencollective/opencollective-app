import React, { Component, PropTypes } from 'react';

class Avatar extends Component {
  propTypes: {
    url: PropTypes.string.isRequired
  }

  render() {
    const url = this.props.url || 'http://api.randomuser.me/portraits/women/39.jpg';

    return (
      <span>
        <img src={url} className='Avatar' />
      </span>
    );
  }
}

export default Avatar;
