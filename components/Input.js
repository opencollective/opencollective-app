import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Input extends Component {
  propTypes: {
    labelText: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    type: React.PropTypes.string,
  }

  defaultProps: {
    type: 'text'
  }

  render() {
    const { labelText, type } = this.props;

    return (
      <div className='Input'>
        <label className='Label'>
          {labelText}:
        </label>
        <input
          className='Field'
          type={type}
          ref='input'
          placeholder={labelText}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }

  handleChange() {
    const { handleChange } = this.props;
    const value = ReactDOM.findDOMNode(this.refs.input).value;
    handleChange(value);
  }
}

export default Input;
