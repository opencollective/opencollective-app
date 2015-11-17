import React from 'react';
import classnames from 'classnames';

const Select = ({options=[], value, handleChange, customClass}) => {
  const className = classnames({
    Select: true,
    [customClass]: !!customClass
  });

  return (
    <select
      className={className}
      value={value}
      onChange={(event) => handleChange(event.target.value)} >
      {options.map(value => {
        return <option value={value} key={value}>{value}</option>
      })}
    </select>
  );
}

export default Select;
