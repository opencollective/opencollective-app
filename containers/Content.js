import React, { Component } from 'react';
import classNames from 'classnames';

class Content extends Component {
  render() {
    const { isLoading } = this.props;
    const contentClassNames = classNames({
      'Content': true,
      'Content--isLoading': isLoading
    });

    return (
      <div className={contentClassNames}>
        {
          isLoading ?
          <div className='Content-loadingIcon'></div> :
          null
        }
        {this.props.children}
      </div>
    );
  }
}

export default Content;
