import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/users';
import Header from '../components/Header';
import Notification from '../components/Notification';
import Input from '../components/Input';
import Content from './Content';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {notification: {}};
  }

  render() {
    return (
      <div>
        <Header title='Login' />
        <Content>
          <Notification {...this.state.notification} />
          <form name='login' onSubmit={this.handleSubmit.bind(this)} className='padded'>
            <Input labelText='Email' type='email' handleChange={this.handleEmail.bind(this)} />
            <Input labelText='Password' type='password' handleChange={this.handlePassword.bind(this)} />
            <button type='submit' className='Button'>Login</button>
          </form>
        </Content>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;
    const { login } = this.props;

    login(email, password)
    .then(response => {
      if (!response.error) {
        window.location = '#/';
        window.location.reload();
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

  handleEmail(email) { this.setState({email}); }

  handlePassword(password) { this.setState({password}); }
}

export default connect(mapStateToProps, {
  login
})(Login);

function mapStateToProps() {
  return {};
}
