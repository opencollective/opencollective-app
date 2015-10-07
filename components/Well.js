import React, { Component } from 'react';

class Well extends Component {
  propTypes: {
    leftText: React.PropTypes.string.isRequired,
    rightText: React.PropTypes.string.isRequired
  }

  render() {
    const { leftText, rightText } = this.props;

    return (
      <div className='Well'>
        <span className='Well-left'>
          {leftText}
        </span>
        <span className='Well-right'>
          {rightText}
        </span>
      </div>
    );
  }
}

export default Well;
