import React, { Component } from 'react';

class Notification extends Component {
  propTypes: {
    message: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired
  }

  render() {
    const status = this.props.status || 'hide';

    return (
      <div className={`Notification Notification--${status}`}>
        {this.props.message}
      </div>
    );
  }
}

export default Notification;
