import React from 'react';

export default ({inProgress, onClick, customClass, children}) => {
  const progressClass = inProgress ? 'Button--inProgress' : '';
  const className = `Button ${customClass} ${progressClass}`;
  const noop = () => {};

  return (
    <div
      className={className}
      onClick={inProgress ? noop : onClick} >
      {children}
    </div>
  );
};
