import React, { Component } from 'react';
import Input from './Input';

class LoginForm extends Component {

  render() {
    const { handleField, handleSubmit, error } = this.props;

    return (
      <form
        name='login'
        onSubmit={handleSubmit.bind(this)}
        className='padded'>
        <Input
          type='email'
          hasError={error.email}
          placeholder='email@example.com'
          handleChange={handleField.bind(this, 'email')} />
        <Input
          type='password'
          hasError={error.password}
          placeholder='******'
          handleChange={handleField.bind(this, 'password')} />
        <button
          type='submit'
          className='Button Button--login'>
          Login
        </button>
      </form>
    );
  }
}

export default LoginForm;
