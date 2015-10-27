import React, { Component } from 'react';
import Icon from './Icon';

class SubmitButton extends Component {

  render() {
    return (
      <span>
        <button
          type='submit'
          className='Button Button--submit'>
          <Icon type='upload' />
          Submit
        </button>
      </span>
    );
  }
}
export default SubmitButton;
