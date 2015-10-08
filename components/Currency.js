import React, { Component } from 'react';
import Numeral from 'numeral';

class Currency extends Component {

  propTypes: {
    value: React.PropTypes.number.isRequired
  }

  defaultProps: {
    value: 0
  }

  render() {
    const {value} = this.props;
    const number = Numeral(value);
    const formatted = number.format('$0,0.00');
    return (
      <span>
        {formatted}
      </span>
    );
  }
};

export default Currency;
