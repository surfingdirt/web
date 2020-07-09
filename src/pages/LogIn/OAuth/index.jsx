import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import Button, { buttonTypes } from 'Components/Widgets/Button';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';
import routes from '~/routes';

import messages from '../messages';
import styles from './styles.scss';

const { LOGIN } = routes;
const { ACTION } = buttonTypes;
const { STANDARD } = cardTypes;

const STEP_START = 0;
const STEP_OAUTH_FETCHING_TOKEN = 1;
const STEP_OAUTH_NO_USER = 2;
const STEP_OAUTH_NO_DATA_ERROR = 3;
const STEP_SIGN_IN_IN_PROGRESS = 4;
const STEP_SIGN_IN_SUCCESS = 5;
const STEP_SIGN_IN_ERROR = 6;

const LoginSuccess = ({ t }) => {
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

  let content;
  switch (step) {
    default:
    case STEP_START:
      content = (
        <>
          <p>Sign in start</p>
        </>
      );
      break;
    case STEP_OAUTH_FETCHING_TOKEN:
      content = (
        <>
          <p>Fetching token</p>
        </>
      );
      break;
    case STEP_OAUTH_NO_USER:
      content = (
        <>
          <Button type={ACTION} href={LOGIN} label={t('signIn')} />
        </>
      );
      break;
    case STEP_OAUTH_NO_DATA_ERROR:
      content = (
        <>
          <p className={styles.errorMessage}>No data: error message</p>
        </>
      );
      break;
    case STEP_SIGN_IN_IN_PROGRESS:
      content = (
        <>
          <p>Signing you in...</p>
        </>
      );
      break;
    case STEP_SIGN_IN_SUCCESS:
      content = (
        <>
          <p>Signed you in!</p>
        </>
      );
      break;
    case STEP_SIGN_IN_ERROR:
      content = (
        <>
          <p className={styles.errorMessage}>Sign-in error</p>
        </>
      );
      break;
  }

  return (
    <>
      <Card type={STANDARD}>{content}</Card>
    </>
  );
};

LoginSuccess.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(LoginSuccess);
