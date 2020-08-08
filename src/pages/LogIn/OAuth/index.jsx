import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import CREATE_USER_OAUTH from 'Apollo/mutations/createUserOAuth.gql';
import LOGIN_OAUTH from 'Apollo/mutations/loginOAuth.gql';
import EMAIL_EXISTS from 'Apollo/queries/emailExists.gql';
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

const LoginOAuth = ({ t, location: { search } }) => {
  const [emailExistsQuery, { data: emailData, loading: emailCheckInProgress }] = useLazyQuery(
    EMAIL_EXISTS,
  );
  const [createUserOAuth, { data: createUserOAuthData, error: createUserOAuthError }] = useMutation(
    CREATE_USER_OAUTH,
  );
  const [loginOAuth, { data: loginOAuthData, error: loginOAuthError }] = useMutation(LOGIN_OAUTH);
  const [step, setStep] = useState(STEP_START);
  const {
    firebaseConfig,
    login: { onSuccess: onLoginSuccess, onFailure: onLoginFailure, saveOrigin },
  } = useContext(AppContext);
  const { displayName, email, oAuthError, provider, token, userPhoto } = useFirebaseOAuth(
    firebaseConfig,
  );

  const onFormSubmit = ({ input: { locale, timezone, username } }) => {
    setStep(STEP_CREATING_PROFILE);
    const input = {
      locale,
      photoUrl: userPhoto,
      timezone,
      token,
      username,
    };
    createUserOAuth({ variables: { input } });
  };

  const queryArgs = qs.parse(search.substr(1));
  const initialErrors = queryArgs.errors || {};
  const initialValues = queryArgs.values || {};
  initialValues.username = displayName;

  useEffect(() => {
    if (createUserOAuthError || loginOAuthError) {
      onLoginFailure();
      setStep(oAuthError);
      return;
    }
    if (oAuthError) {
      setStep(oAuthError);
      return;
    }

    if (step === STEP_START) {
      setStep(STEP_OAUTH_FETCHING_TOKEN);
    } else if (step === STEP_OAUTH_FETCHING_TOKEN && token) {
      setStep(STEP_OAUTH_CHECKING_EMAIL);
    } else if (step === STEP_OAUTH_CHECKING_EMAIL && email) {
      if (emailData) {
        if (emailData.emailExists) {
          loginOAuth({ variables: { input: { token } } });
          setStep(STEP_SIGN_IN_IN_PROGRESS);
        } else {
          setStep(STEP_ENTERING_USERNAME);
        }
      } else if (!emailCheckInProgress) {
        emailExistsQuery({ variables: { email } });
      }
    } else if (step === STEP_SIGN_IN_IN_PROGRESS && loginOAuthData) {
      onLoginSuccess(loginOAuthData.loginOAuth);
      setStep(STEP_SIGN_IN_SUCCESS);
    } else if (step === STEP_CREATING_PROFILE && createUserOAuthData) {
      setStep(STEP_SIGN_IN_SUCCESS);
      onLoginSuccess(createUserOAuthData.createUserOAuth.token);
    }
  }, [
    oAuthError,
    step,
    token,
    email,
    emailData,
    emailCheckInProgress,
    createUserOAuthData,
    createUserOAuthError,
    loginOAuthData,
    loginOAuthError,
  ]);

  let content;
  if (animationSteps.includes(step)) {
    content = (
      <div className={styles.animationWrapper}>
        <OAuthAnimation provider={provider} userPhoto={userPhoto} step={step} />
        <p>{stepMessages[step]}</p>
        {step === STEP_ENTERING_USERNAME && (
          <OAuthRegistrationForm
            initialErrors={initialErrors}
            initialValues={initialValues}
            onSubmit={onFormSubmit}
          />
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
