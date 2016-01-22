import React from 'react';
import Icon from './Icon';

export default({exportAction}) => {
  return (
    <span className="ExportButton" onClick={exportAction.bind(this)}>
      <Icon type='down' />Export
    </span>
  );
}
