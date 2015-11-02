import React, { Component, PropTypes } from 'react';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

class DatePicker extends Component {
  render() {
    const { selected, handleChange, maxDate } = this.props;

    return (
      <span className='DatePicker'>
        <ReactDatePicker
          selected={selected}
          maxDate={moment(maxDate)}
          onChange={this.handleChange.bind(this)}
          dateFormat='DD/MM/YYYY' />
      </span>
    );
  }

  handleChange(date) {
    this.props.handleChange(date.format('YYYY-MM-DD'));
  }
};

export default DatePicker;
