import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Input = ({
  type,
  hasError,
  placeholder,
  maxLength,
  handleChange,
  id,
  value,
  customClass,
  isSuccessful
}) => {
  const className = classnames({
    Input: true,
    'Input--error': hasError,
    'Input--success': isSuccessful,
    [customClass]: !!customClass
  });

  return (
    <span className={className}>
      <input
        className='Field'
        id={id}
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value) } />
    </span>
  );
};

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  max: PropTypes.string,
  id: PropTypes.string,
  hasError: PropTypes.bool,
  placeholder: PropTypes.string
};

Input.defaultProps = {
  type: 'text',
  hasError: false,
  value: ''
};

export default Input;
