import React, { Component, PropTypes } from 'react';
import Numeral from 'numeral';

const Currency = ({value}) => {
  const number = Numeral(value);
  const formatted = number.format('$ 0,0.00');

  return <span className='Currency'>{formatted}</span>;
};

Currency.propTypes = {
  value: PropTypes.number.isRequired
};

Currency.defaultProps = {
  value: 0
};

export default Currency;
