import React from 'react';

export default ({name, description}) => {
  return (
    <div className='PublicGroupHeader'>
      <div className='PublicGroupHeader-name'>
        {name}
      </div>
      <div className='PublicGroupHeader-description'>
        {description}
      </div>
    </div>
  );
};
