import React, { Component } from 'react';

class Notification extends Component {
  propTypes: {
    message: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired
  }

  render() {
    const colors = {
      success: 'green',
      warning: 'yellow',
      error: 'red',
    };
    const {type, message} = this.props;
    const className = `bold center p2 mb2 white bg-${colors[type]} rounded`;

    return (
      <div className={className}>
        {message}
      </div>
    );
  }
}

export default Notification;
