import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { ApolloConsumer } from '@apollo/react-hooks';

import Button, { buttonTypes } from 'Components/Widgets/Button';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Translate from 'Hocs/Translate';
import useFirebaseOAuth from 'Hooks/useFirebaseOAuth';
import AppContext from '~/contexts';
import routes from '~/routes';

import OAuthRegistrationForm from '../../User/OAuthRegistration/form';
import messages from '../messages';

import OAuthAnimation from './Animation';
import styles from './styles.scss';
import steps from './steps';

const { LOGIN } = routes;
const { ACTION } = buttonTypes;
const { STANDARD } = cardTypes;

const {
  STEP_START,
  STEP_OAUTH_FETCHING_TOKEN,
  STEP_OAUTH_CHECKING_EMAIL,
  STEP_ENTERING_USERNAME,
  STEP_CREATING_PROFILE,
  STEP_SIGN_IN_IN_PROGRESS,
  STEP_SIGN_IN_SUCCESS,
  STEP_OAUTH_NO_DATA_ERROR,
  STEP_OAUTH_NO_USER,
  STEP_EXISTING_USERNAME_ERROR,
  STEP_PROFILE_CREATION_ERROR,
  STEP_SIGN_IN_ERROR,
} = steps;

const animationSteps = [
  STEP_START,
  STEP_OAUTH_FETCHING_TOKEN,
  STEP_OAUTH_CHECKING_EMAIL,
  STEP_ENTERING_USERNAME,
  STEP_CREATING_PROFILE,
  STEP_SIGN_IN_IN_PROGRESS,
  STEP_SIGN_IN_SUCCESS,
];

const stepMessages = {
  [STEP_START]: 'Start',
  [STEP_OAUTH_FETCHING_TOKEN]: 'Fetching token',
  [STEP_OAUTH_CHECKING_EMAIL]: 'Checking email',
  [STEP_ENTERING_USERNAME]: 'Waiting for profile info',
  [STEP_CREATING_PROFILE]: 'Creating profile',
  [STEP_SIGN_IN_IN_PROGRESS]: 'Signing you in',
  [STEP_SIGN_IN_SUCCESS]: 'Signed you in!',
  [STEP_OAUTH_NO_DATA_ERROR]: 'No data: error message',
  [STEP_SIGN_IN_ERROR]: 'Sign-in error',
};

const getCheckEmailExistsPromise = () =>
  new Promise((resolve) => {
    console.log('Pretending to check email exists...');
    setTimeout(() => {
      const emailExists = false;
      console.log('Returning email exists:', emailExists);
      resolve({ emailExists });
    }, 2000);
  });

const getSignInPromise = () =>
  new Promise((resolve) => {
    console.log('Pretending to sign in...');
    setTimeout(() => {
      const result = { jwt: 'wazap' };
      console.log('Returning sign in:', result);
      resolve(result);
    }, 2000);
  });

const LoginOAuth = ({ t, location: { search } }) => {
  const [user, setUser] = useState(null);
  const [emailCheckInProgress, setEmailCheckInProgress] = useState(false);
  const [signInInProgress, setSignInInProgress] = useState(false);
  const [step, _setStep] = useState(STEP_START);
  const { firebaseConfig } = useContext(AppContext);
  const { displayName, email, oAuthError, provider, token, userPhoto } = useFirebaseOAuth(
    firebaseConfig,
  );

  const setStep = (s) => {
    console.log('settingStep', s);
    _setStep(s);
  };

  const onFormSubmit = (data) => {
    setStep(STEP_CREATING_PROFILE);
    console.log('Pretending to create user with data', { ...data, email, token, userPhoto });
    setTimeout(() => {
      const result = { user: { toto: 1 } };
      console.log('Returning result:', result);
      setUser(result.user);
      setStep(STEP_SIGN_IN_IN_PROGRESS);
    }, 2000);
  };

  const queryArgs = qs.parse(search.substr(1));
  const initialErrors = queryArgs.errors || {};
  const initialValues = queryArgs.values || {};
  initialValues.username = displayName;

  useEffect(() => {
    if (oAuthError) {
      setStep(oAuthError);
      return;
    }

    if (step === STEP_START && !token) {
      setStep(STEP_OAUTH_FETCHING_TOKEN);
    } else if (step === STEP_OAUTH_FETCHING_TOKEN && token) {
      setStep(STEP_OAUTH_CHECKING_EMAIL);
    } else if (step === STEP_OAUTH_CHECKING_EMAIL && !emailCheckInProgress) {
      setEmailCheckInProgress(true);
      getCheckEmailExistsPromise().then((result) => {
        setEmailCheckInProgress(false);
        if (result.emailExists) {
          setStep(STEP_SIGN_IN_IN_PROGRESS);
        } else {
          setStep(STEP_ENTERING_USERNAME);
        }
      });
    } else if (step === STEP_SIGN_IN_IN_PROGRESS && !signInInProgress) {
      setSignInInProgress(true);
      getSignInPromise().then((result) => {
        console.log({ result });
        setSignInInProgress(false);
        if (result.jwt) {
          setStep(STEP_SIGN_IN_SUCCESS);
        }
      });
    }
  }, [oAuthError, step, token]);

  let content;
  if (animationSteps.includes(step)) {
    content = (
      <div className={styles.animationWrapper}>
        <OAuthAnimation provider={provider} userPhoto={userPhoto} step={step} />
        <p>{stepMessages[step]}</p>
        {step === STEP_ENTERING_USERNAME && (
          <ApolloConsumer>
            {(client) => (
              <OAuthRegistrationForm
                initialErrors={initialErrors}
                initialValues={initialValues}
                onSubmit={onFormSubmit}
                runQuery={client.query}
              />
            )}
          </ApolloConsumer>
        )}
      </div>
    );
  } else if (step === STEP_OAUTH_NO_USER) {
    content = (
      <>
        <p>{t('noUserFound')}</p>
        <Button type={ACTION} href={LOGIN} label={t('signIn')} />
      </>
    );
  } else {
    content = <p>{stepMessages[step]}</p>;
  }

  return (
    <>
      <Card type={STANDARD} title={t('signInPage')}>
        {content}
      </Card>
    </>
  );
};

LoginOAuth.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(LoginOAuth);
