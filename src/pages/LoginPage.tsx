import React from 'react';
import Login from 'features/Login/Login';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isLoggedInSelector } from 'common/selectors';

function LoginPage() {
  const isLoggedIn = useSelector(isLoggedInSelector);

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return <Login />;
}

export default LoginPage;
