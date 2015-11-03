import React, { Component } from 'react';
import classNames from 'classnames';

export default ({isLoading, children}) => {
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
      {children}
    </div>
  );
}

