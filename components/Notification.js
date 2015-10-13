import React, { Component } from 'react';

class Notification extends Component {
  propTypes: {
    message: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <div className={`Notification Notification--${this.props.status}`}>
        {this.props.message}
      </div>
    );
  }
}

export default Notification;
