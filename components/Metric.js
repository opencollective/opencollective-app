import React from 'react';

export default ({label, value}) => (
  <div className='Metric'>
    <div className='Metric-value'>
      {value}
    </div>
    <div className='Metric-label'>{label}</div>
  </div>
);