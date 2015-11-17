import React from 'react';
import Icon from './Icon';

export default () => {
  return (
    <span>
      <button
        type='submit'
        className='Button Button--submit'>
        <Icon type='upload' />
        Submit
      </button>
    </span>
  );
}
