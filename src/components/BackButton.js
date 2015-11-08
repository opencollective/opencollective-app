import React, { Component } from 'react';
import Icon from './Icon';

export default () => {
  const back = () => window.history.back();

  return (
    <span className='BackButton' onClick={back}>
      <Icon type='left' />
    </span>
  );
}

