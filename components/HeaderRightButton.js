import React, { Component } from 'react';
import { Link } from 'react-router';

class HeaderRightButton extends Component {
  propTypes: {
    url: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  }

  render() {
    const {url, text} = this.props;
    return (
      <Link to={url}>
        {text}
      </Link>
    );
  }
}

export default HeaderRightButton;
