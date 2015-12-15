import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Select = ({options=[], value, handleChange, customClass, disabled}) => {
  const className = classnames({
    Select: true,
    [customClass]: !!customClass
  });

  return (
    <div className='SelectContainer'>
      <select
        disabled={disabled}
        className={className}
        value={value}
        onChange={(event) => handleChange(event.target.value)} >
        {options.map(value => {
          return <option value={value} key={value}>{value}</option>
        })}
      </select>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default Select;
