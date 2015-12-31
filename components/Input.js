import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Input = ({
  labelText,
  type,
  hasError,
  placeholder,
  maxLength,
  handleChange,
  value,
  customClass
}) => {
  const className = classnames({
    Input: true,
    'Input--error': hasError,
    [customClass]: !!customClass
  });

  return (
    <div className={className}>
      {labelText ? <label className='Label'>{labelText}:</label> : null}
      <input
        className='Field'
        type={type}
        maxLength={maxLength}
        placeholder={placeholder || labelText}
        value={value}
        onChange={(e) => handleChange(e.target.value) } />
    </div>
  );
};

Input.propTypes = {
  labelText: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  max: PropTypes.string,
  hasError: PropTypes.bool,
  placeholder: PropTypes.string
};

Input.defaultProps = {
  type: 'text',
  hasError: false,
  value: ''
};

export default Input;
