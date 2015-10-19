import React from 'react';
import classNames from 'classnames';

export default ({inProgress, onClick, customClass, children}) => {
  const noop = () => {};
  const btnClass = classNames({
    'Button': true,
    [customClass]: true,
    'Button--inProgress': inProgress
  });

  return (
    <div
      className={btnClass}
      onClick={inProgress ? noop : onClick} >
      {children}
    </div>
  );
};
