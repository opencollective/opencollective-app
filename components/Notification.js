import React, { Component } from 'react';
import Icon from './Icon';

class Notification extends Component {
  render() {
    const { notification } = this.props;
    const status = notification.status || 'hide';

    return (
      <div className={`Notification Notification--${status}`}>
        {this.icon(status)}
        {notification.message}
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

  componentDidMount() {
    this.props.resetNotifications();
  }
};

export default Notification;
