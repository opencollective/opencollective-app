import React from 'react';
import ReactIntl from 'react-intl';

const IntlMixin = ReactIntl.IntlMixin;
const FormattedNumber = ReactIntl.FormattedNumber;

/**
 * No Mixins
 * Unfortunately ES6 launched without any mixin support.
 * Therefore, there is no support for mixins when you use React with ES6 classes.
 */

const Currency = React.createClass({
    mixins: [IntlMixin],

    render: function () {
      const currency = this.props.currency || 'USD';
      return (
        <span>
          <FormattedNumber value={this.props.value} style="currency" currency={currency} />
        </span>
      );
    }
});

export default Currency;
