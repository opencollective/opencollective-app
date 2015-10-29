import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

class Input extends Component {
  propTypes: {
    labelText: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    type: React.PropTypes.string,
    hasError: React.PropTypes.bool
  }

  defaultProps: {
    type: 'text',
    hasError: false
  }

  render() {
    const { labelText, type, hasError, placeholder } = this.props;
    const className = classnames({
      Input: true,
      'Input--error': hasError
    });

    return (
      <div className={className}>
        <label className='Label'>
          {labelText}:
        </label>
        <input
          className='Field'
          type={type}
          ref='input'
          placeholder={placeholder || labelText}
          onChange={this.handleChange.bind(this)} />
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
