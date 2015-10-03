import React from 'react';
import Numeral from 'numeral';

/**
 * No Mixins
 * Unfortunately ES6 launched without any mixin support.
 * Therefore, there is no support for mixins when you use React with ES6 classes.
 */

const Currency = React.createClass({

  propTypes: {
    value: React.PropTypes.number.isRequired
  },

  getDefaultProps() {
    return {
      value: 0,
    };
  },

  render() {
    const {value} = this.props;
    const number = Numeral(value);
    const formatted = number.format('$0,0.00');
    return (
      <span>
        {formatted}
      </span>
    );
  },
});

export default Currency;
