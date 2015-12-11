import React from 'react';

export default ({name}) => {
  return (
    <div className='PublicGroupHeader'>
      <div className='PublicGroupHeader-name'>
        {name}
      </div>
      <div className='PublicGroupHeader-description'>
        In order to reach our goals, {name} needs your help
      </div>
    </div>
  );
};
