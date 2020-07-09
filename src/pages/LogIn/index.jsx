import React, { useContext } from 'react';

import AppContext from '~/contexts';

import EmailPassword from './EmailPassword';

const Login = () => {
  const {
    features: { firebaseAuth },
  } = useContext(AppContext);

  console.log({ firebaseAuth });

  if (firebaseAuth) {
    return <p>FirebaseAuth</p>;
  }

  return <EmailPassword />;
};

export default Login;
