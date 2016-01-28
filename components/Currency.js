import React, { PropTypes } from 'react';
import formatCurrency from '../lib/format_currency';

const Currency = ({value = 0, currency = 'USD', precision=0, compact=true}) => {
  precision = parseInt(precision, 10);
  return <span className='Currency'>{formatCurrency(value, currency, {precision, compact})}</span>;
};

Currency.propTypes = {
  value: PropTypes.number.isRequired
};

Currency.defaultProps = {
  value: 0
};

export default Currency;
