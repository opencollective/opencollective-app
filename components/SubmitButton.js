import React from 'react';
import classNames from 'classnames';

import Icon from './Icon';

export default ({children, label, color}) => {
  const className = classNames({
    'Button': true,
    'Button--submit': true,
    [`Button--${color}`]: !!color,
  });

  return (
    <span>
      <button
        type='submit'
        className={className}>
        {!!children ? children : (
          <span>
            <Icon type='upload' /> {label || 'Submit'}
          </span>
        )}
      </button>
    </span>
  );
}
