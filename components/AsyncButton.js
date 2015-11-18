import React from 'react';
import classNames from 'classnames';

export default ({inProgress, onClick, customClass, children, color}) => {
  const noop = () => {};
  const btnClass = classNames({
    'Button': true,
    [customClass]: !!customClass,
    [`Button--${color}`]: !!color,
    'Button--inProgress': inProgress
  });

  return (
    <div
      className={btnClass}
      onClick={inProgress ? noop : onClick} >
      {inProgress ? 'Loading' : children}
    </div>
  );
};
