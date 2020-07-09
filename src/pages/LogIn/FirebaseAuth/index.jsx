import React, { useContext, useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';
import routes from '~/routes';

import messages from '../messages';

const { LOGIN_SUCCESS } = routes;
const AUTH_METHOD = 'redirect';
const AUTH_DESTINATION_AFTER_LOGIN = LOGIN_SUCCESS;

const FirebaseAuth = () => {
  const [ready, setReady] = useState(false);
  const { firebaseConfig } = useContext(AppContext);

  const uiConfig = {
    credentialHelper: 'none',
    signInFlow: AUTH_METHOD,
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: AUTH_DESTINATION_AFTER_LOGIN,
  };

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    setReady(true);
  }, []);

  return (
    <>
      <p>This is FirebaseAuth</p>
      {ready && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
    </>
  );
};

export default Translate(messages)(FirebaseAuth);
