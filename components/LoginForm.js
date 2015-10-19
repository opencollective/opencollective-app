import React, { Component } from 'react';

class LoginForm extends Component {

  render() {
    const { handleField, handleSubmit } = this.props;

    return (
      <form
        name='login'
        onSubmit={handleSubmit.bind(this)}
        className='padded'>
        <input
          className='Field'
          type='email'
          placeholder='email@example.com'
          onChange={handleField.bind(this, 'email')} />
        <input
          className='Field'
          type='password'
          placeholder='******'
          onChange={handleField.bind(this, 'password')} />
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
