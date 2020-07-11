import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Button, { buttonTypes } from 'Components/Widgets/Button';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Translate from 'Hocs/Translate';
import useFirebaseOAuth, { steps } from 'Hooks/useFirebaseOAuth';
import AppContext from '~/contexts';
import routes from '~/routes';

import messages from '../messages';
import OAuthAnimation from './Animation';

const { LOGIN } = routes;
const { ACTION } = buttonTypes;
const { STANDARD } = cardTypes;
const {
  STEP_START,
  STEP_OAUTH_FETCHING_TOKEN,
  STEP_SIGN_IN_IN_PROGRESS,
  STEP_SIGN_IN_SUCCESS,
  STEP_OAUTH_NO_DATA_ERROR,
  STEP_OAUTH_NO_USER,
  STEP_SIGN_IN_ERROR,
} = steps;

const animationSteps = [
  STEP_START,
  STEP_OAUTH_FETCHING_TOKEN,
  STEP_SIGN_IN_IN_PROGRESS,
  STEP_SIGN_IN_SUCCESS,
];

const stepMessages = {
  [STEP_START]: 'Start',
  [STEP_OAUTH_FETCHING_TOKEN]: 'Fetching token',
  [STEP_SIGN_IN_IN_PROGRESS]: 'Signing you in',
  [STEP_SIGN_IN_SUCCESS]: 'Signed you in!',
  [STEP_OAUTH_NO_DATA_ERROR]: 'No data: error message',
  [STEP_SIGN_IN_ERROR]: 'Sign-in error',
};

const LoginOAuth = ({ t }) => {
  const { firebaseConfig } = useContext(AppContext);
  const { step, userPhoto, provider } = useFirebaseOAuth(firebaseConfig);

  let content;
  if (animationSteps.includes(step)) {
    content = <OAuthAnimation provider={provider} userPhoto={userPhoto} step={step} />;
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
