import { Component } from 'react';
import AuthService from 'utils/AuthService';

class AuthCallback extends Component {

  componentDidMount() {
    AuthService.setAccessToken();
    AuthService.setIdToken();
    window.location.href = "/";
  }

  render() {
    return null;
  }
}

export default AuthCallback;