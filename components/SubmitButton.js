import React from 'react';
import Icon from './Icon';

export default ({children}) => {
  return (
    <span>
      <button
        type='submit'
        className='Button Button--submit'>
        {!!children ? children : (
          <span>
            <Icon type='upload' />Submit
          </span>
        )}
      </button>
    </span>
  );
}
