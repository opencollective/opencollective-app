import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

class Input extends Component {
  propTypes: {
    labelText: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    hasError: React.PropTypes.bool
  }

  defaultProps: {
    type: 'text',
    hasError: false,
    value: ''
  }

  render() {
    const { labelText, type, hasError, placeholder, value } = this.props;
    const className = classnames({
      Input: true,
      'Input--error': hasError
    });

    return (
      <div className={className}>
        {this.label(labelText)}
        <input
          className='Field'
          type={type}
          ref='input'
          value={value}
          placeholder={placeholder || labelText}
          onChange={this.handleChange.bind(this)} />
      </div>
    );
  }

  label(labelText) {
    if (labelText) {
      return <label className='Label'>
          {labelText}:
        </label>;
    } else {
      return null;
    }
  }

  handleChange() {
    const { handleChange } = this.props;
    const value = ReactDOM.findDOMNode(this.refs.input).value;
    handleChange(value);
  }
}

export default Input;
