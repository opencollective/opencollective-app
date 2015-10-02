import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Notification from '../components/Notification';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {notification: {}};
  }

  render() {
    return (
      <div>
        <Header title='Login' />
        <Notification {...this.state.notification} />
        <div className='px2 mt2'>
          <form name='login' onSubmit={this.handleSubmit.bind(this)}>
            <label>Email</label>
            <input ref='email' name='email' type='email' placeholder='example@gmail.com' className='field block mb2' />

            <label>Password</label>
            <input ref='password' name='password' type='password' placeholder='*******' className='field block mb2' />

            <hr/>
            <button type='submit' className='btn btn-primary block mt2'>Login</button>
          </form>
        </div>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const email = React.findDOMNode(this.refs.email).value.trim();
    const password = React.findDOMNode(this.refs.password).value.trim();
    const { login } = this.props;

    login(email, password)
    .then(response => {
      if (!response.error) {
        window.location = '#/';
      } else {
        this.setState({
          notification: {
            message: response.error,
            type: 'error'
          }
        });
      }
    });
  }
}

export default Login;
