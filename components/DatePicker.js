import React, { Component } from 'react';
import ReactDatepicker from 'react-datepicker';

class DatePicker extends Component {
  render() {
    const { labelText } = this.props;
    return (
      <div>
       <label className='Label'>
          {labelText}:
        </label>
        <ReactDatepicker className='Field' />
      </div>
    );
  }
}

export default DatePicker;
