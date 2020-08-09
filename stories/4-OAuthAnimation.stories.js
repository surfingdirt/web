import React from 'react';

import OAuthAnimation from '../src/pages/LogIn/OAuth/Animation';
import { steps, FACEBOOK, GOOGLE } from '../src/hooks/useFirebaseOAuth';
import ProfilePhoto from '../src/images/rockman.jpg';

const {
  STEP_START,
  STEP_OAUTH_FETCHING_TOKEN,
  STEP_SIGN_IN_IN_PROGRESS,
  STEP_SIGN_IN_SUCCESS,
} = steps;

export default {
  title: 'OAuthAnimation',
  component: OAuthAnimation,
};

export const Start = () => <OAuthAnimation step={STEP_START} />;
Start.story = {
  name: '1 - Start',
};

export const FetchingToken = () => <OAuthAnimation step={STEP_OAUTH_FETCHING_TOKEN} />;
FetchingToken.story = {
  name: '2 - Fetching token',
};

export const FacebookInProgress = () => (
  <OAuthAnimation step={STEP_SIGN_IN_IN_PROGRESS} provider={FACEBOOK} userPhoto={ProfilePhoto} />
);
FacebookInProgress.story = {
  name: '3a - Facebook sign-in',
};

export const GoogleInProgress = () => (
  <OAuthAnimation step={STEP_SIGN_IN_IN_PROGRESS} provider={GOOGLE} userPhoto={ProfilePhoto} />
);
GoogleInProgress.story = {
  name: '3b - Google sign-in',
};

export const FacebookSuccess = () => (
  <OAuthAnimation step={STEP_SIGN_IN_SUCCESS} provider={FACEBOOK} userPhoto={ProfilePhoto} />
);
FacebookSuccess.story = {
  name: '4a - Facebook success',
};

export const GoogleSuccess = () => (
  <OAuthAnimation step={STEP_SIGN_IN_SUCCESS} provider={GOOGLE} userPhoto={ProfilePhoto} />
);
GoogleSuccess.story = {
  name: '4b - Google success',
};
