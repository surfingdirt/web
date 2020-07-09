import React, { useContext } from 'react';
import { Redirect } from 'react-router';

import AppContext from '~/contexts';
import routes from '~/routes';

import EmailPassword from './EmailPassword';

const { HOME } = routes;

const Login = () => {
  const {
    features: { firebaseAuth },
    login: {
      data: { accessToken },
    },
  } = useContext(AppContext);

  console.log({ firebaseAuth });

  if (accessToken) {
    return <Redirect to={HOME} />;
  }

  if (firebaseAuth) {
    return <p>FirebaseAuth</p>;
  }

  return <EmailPassword />;
};

export default Login;
