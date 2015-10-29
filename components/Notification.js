import React, { Component } from 'react';
import Icon from './Icon';

class Notification extends Component {
  propTypes: {
    message: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired
  }

  render() {
    const status = this.props.status || 'hide';

    return (
      <div className={`Notification Notification--${status}`}>
        {this.icon(status)}
        {this.props.message}
      </div>
    );
  }

  icon(status) {
    const type = {
      error: 'rejected',
      success: 'approved',
      info: 'pending',
      warning: 'pending'
    };

    return <Icon type={type[status]} />;
  }
}

export default Notification;
