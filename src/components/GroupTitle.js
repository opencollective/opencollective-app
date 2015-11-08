import React, { Component, PropTypes } from 'react';
import Currency from './Currency';

export default ({group}) => {
  return (
    <div className='Well'>
      <span className='Well-primary'>
        Available budget
      </span>
      <span className='Well-right'>
        <Currency value={group.budget} />
      </span>
    </div>
  );
};
