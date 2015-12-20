import React, { PropTypes } from 'react';
import format_currency from '../lib/currency';

const Currency = ({value = 0, currency}) => {
  return <span className='Currency'>{format_currency(value, currency)}</span>;
};

Currency.propTypes = {
  value: PropTypes.number.isRequired
};

Currency.defaultProps = {
  value: 0
};

export default Currency;
