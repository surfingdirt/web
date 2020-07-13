import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { InlineSpinner } from 'Components/Widgets/Spinner';
import SVG from 'Components/Widgets/SVG';
import { FACEBOOK, GOOGLE } from 'Hooks/useFirebaseOAuth';
import FacebookSVG from 'Images/facebook-logo.svg';
import GoogleSVG from 'Images/google-logo.svg';
import Logo from 'Images/logo-regular.svg';

import steps from '../steps';
import styles from './styles.scss';

const providerIcons = {
  [FACEBOOK]: <SVG icon={FacebookSVG} label="Facebook" />,
  [GOOGLE]: <SVG icon={GoogleSVG} label="Google" />,
};

const {
  STEP_START,
  STEP_OAUTH_FETCHING_TOKEN,
  STEP_OAUTH_CHECKING_EMAIL,
  STEP_ENTERING_USERNAME,
  STEP_CREATING_PROFILE,
  STEP_SIGN_IN_IN_PROGRESS,
  STEP_SIGN_IN_SUCCESS,
} = steps;

const stepClasses = {
  [STEP_START]: styles.start,
  [STEP_OAUTH_FETCHING_TOKEN]: styles.fetching,
  [STEP_OAUTH_CHECKING_EMAIL]: styles.checkingEmail,
  [STEP_ENTERING_USERNAME]: styles.enteringUsername,
  [STEP_CREATING_PROFILE]: styles.creatingProfile,
  [STEP_SIGN_IN_IN_PROGRESS]: styles.signingIn,
  [STEP_SIGN_IN_SUCCESS]: styles.done,
};

const OAuthAnimation = ({ displayName, provider, step, userPhoto }) => {
  return (
    <div className={styles.wrapper}>
      <div className={classnames(styles.box, styles.providerBox)}>
        {provider ? providerIcons[provider] : <InlineSpinner negative={false} />}
      </div>
      <div className={classnames(styles.userBoxWrapper, stepClasses[step])}>
        <div className={classnames(styles.box, styles.userBox)}>
          {userPhoto ? (
            <img
              className={styles.userPhoto}
              src={userPhoto}
              alt={displayName}
              referrerpolicy="no-referrer"
            />
          ) : (
            <InlineSpinner />
          )}
        </div>
      </div>
      <div className={classnames(styles.box, styles.siteBox)}>
        <SVG icon={Logo} presentationOnly />
      </div>
    </div>
  );
};

OAuthAnimation.propTypes = {
  displayName: PropTypes.string,
  provider: PropTypes.string,
  // step: PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired,
  userPhoto: PropTypes.string,
};

OAuthAnimation.defaultProps = {
  displayName: null,
  provider: null,
  userPhoto: null,
};

export default OAuthAnimation;
