import React, { Component, PropTypes } from 'react';
import Numeral from 'numeral';

class Currency extends Component {
  propTypes: {
    value: PropTypes.number.isRequired
  }

  defaultProps: {
    value: 0
  }

  render() {
    const {value} = this.props;
    const number = Numeral(value);
    const formatted = number.format('$ 0,0.00');
    return (
      <span className='Currency'>
        {formatted}
      </span>
    );
  }
};

export default Currency;
