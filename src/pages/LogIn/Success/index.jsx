import React, { useContext, useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';

import messages from '../messages';

const STEP_START = 0;
const STEP_OAUTH_FETCHING_TOKEN = 1;
const STEP_OAUTH_NO_USER = 2;
const STEP_OAUTH_NO_DATA_ERROR = 3;
const STEP_SIGN_IN_IN_PROGRESS = 4;
const STEP_SIGN_IN_SUCCESS = 5;
const STEP_SIGN_IN_ERROR = 6;

const LoginSuccess = () => {
  const [step, setStep] = useState(STEP_START);
  const { firebaseConfig } = useContext(AppContext);

  useEffect(() => {
    setStep(STEP_OAUTH_FETCHING_TOKEN);

    firebase.initializeApp(firebaseConfig);
    firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        // No user, display a link to the sign-in page
        setStep(STEP_OAUTH_NO_USER);
      } else if (user.providerData.length === 0) {
        // A user, but no provider data: should not happen. Display an error message.
        setStep(STEP_OAUTH_NO_DATA_ERROR);
      } else {
        // A user with provider data. Perform login
        const { displayName, email, photoURL, providerId } = user.providerData[0];
        setStep(STEP_SIGN_IN_IN_PROGRESS);
        try {
          await new Promise((resolve) => {
            setTimeout(() => {
              console.log('Fake user created:', {
                displayName,
                email,
                photoURL,
                providerId,
              });
              resolve('whatever');
            }, 5000);
          });
          setStep(STEP_SIGN_IN_SUCCESS);
        } catch (e) {
          setStep(STEP_SIGN_IN_ERROR);
        }
      }
    });
  }, []);

  switch (step) {
    default:
    case STEP_START:
      return (
        <>
          <p>Sign in start</p>
        </>
      );
    case STEP_OAUTH_FETCHING_TOKEN:
      return (
        <>
          <p>Fetching token</p>
        </>
      );
    case STEP_OAUTH_NO_USER:
      return (
        <>
          <p>No user: link to the sign-in page</p>
        </>
      );
    case STEP_OAUTH_NO_DATA_ERROR:
      return (
        <>
          <p>No data: error message</p>
        </>
      );
    case STEP_SIGN_IN_IN_PROGRESS:
      return (
        <>
          <p>Signing you in...</p>
        </>
      );
    case STEP_SIGN_IN_SUCCESS:
      return (
        <>
          <p>Signed you in!</p>
        </>
      );
    case STEP_SIGN_IN_ERROR:
      return (
        <>
          <p>Sign-in error</p>
        </>
      );
  }
};

export default Translate(messages)(LoginSuccess);
