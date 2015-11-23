import React from 'react';
import Select from './Select';

export default ({tags, attributes, handleChange}) => {
  const props = {
    value: attributes.tags ? attributes.tags[0] : tags[0],
    options: tags,
    handleChange: handleChange
  };

  return <Select {...props} />;
};
