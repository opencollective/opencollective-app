import React, { Component, PropTypes } from 'react';

class Icon extends Component {
  propTypes: {
    type: PropTypes.string.isRequired
  }

  render() {
    const type = this.props.type;
    const className = `Icon Icon--${type}`;
    return (
      <i className={className} />
    );
  }
}

export default Icon;
