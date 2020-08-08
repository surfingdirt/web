import React, { useContext } from 'react';
import { Redirect } from 'react-router';

import AppContext from '~/contexts';
import routes from '~/routes';

import EmailPassword from './EmailPassword';
import FirebaseAuth from './FirebaseAuth';

const { HOME } = routes;

const Login = () => {
  const {
    features: { firebaseAuth },
    login: {
      data: { accessToken },
    },
  } = useContext(AppContext);

  if (accessToken) {
    return <Redirect to={HOME} />;
  }

  if (firebaseAuth) {
    return (
      <>
        <FirebaseAuth />
        <EmailPassword />
      </>
    );
  }

  return <EmailPassword />;
};

export default Login;
