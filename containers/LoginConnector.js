import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/users';
import Header from '../components/Header';
import Notification from '../components/Notification';
import Content from './Content';

class LoginConnector extends Component {
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
          <div className='px2 mt2'>
            <form name='login' onSubmit={this.handleSubmit.bind(this)}>
              <label>Email</label>
              <input ref='email' name='email' type='email' placeholder='example@gmail.com' className='Field' />

              <label>Password</label>
              <input ref='password' name='password' type='password' placeholder='*******' className='Field' />

              <hr/>
              <button type='submit' className='Button'>Login</button>
            </form>
          </div>
        </Content>
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
}

export default connect(mapStateToProps, {
  login
})(LoginConnector);

function mapStateToProps () {
  return {};
}
