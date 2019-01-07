import React from 'react';
import LoginForm from './LoginForm';


const Auth = ({ children, user, login }) => {
  if (user) {
    return children;
  } else {
    return <LoginForm user={user} login={login} />
  }
}

export default Auth;