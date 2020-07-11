import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import SVG from 'Components/Widgets/SVG';
import { steps, FACEBOOK, GOOGLE } from 'Hooks/useFirebaseOAuth';
import FacebookSVG from 'Images/facebook-logo.svg';
import GoogleSVG from 'Images/google-logo.svg';
import Logo from 'Images/logo-regular.svg';

import styles from './styles.scss';

const providerIcons = {
  [FACEBOOK]: <SVG icon={FacebookSVG} label="Facebook" />,
  [GOOGLE]: <SVG icon={GoogleSVG} label="Google" />,
};

const {
  STEP_START,
  STEP_OAUTH_FETCHING_TOKEN,
  STEP_SIGN_IN_IN_PROGRESS,
  STEP_SIGN_IN_SUCCESS,
} = steps;

const stepClasses = {
  [STEP_START]: styles.start,
  [STEP_OAUTH_FETCHING_TOKEN]: styles.fetching,
  [STEP_SIGN_IN_IN_PROGRESS]: styles.signingIn,
  [STEP_SIGN_IN_SUCCESS]: styles.done,
};

const OAuthAnimation = ({ provider, step, userPhoto }) => {
  const userStyle = userPhoto ? { backgroundImage: `url(${userPhoto})` } : null;

  return (
    <div className={styles.wrapper}>
      <div className={classnames(styles.box, styles.providerBox)}>
        {provider ? providerIcons[provider] : null}
      </div>
      <div className={classnames(styles.userBoxWrapper, stepClasses[step])}>
        <div className={classnames(styles.box, styles.userBox)} style={userStyle} />
      </div>
      <div className={classnames(styles.box, styles.siteBox)}>
        <SVG icon={Logo} presentationOnly />
      </div>
    </div>
  );
};

OAuthAnimation.propTypes = {
  provider: PropTypes.string,
  step: PropTypes.number.isRequired,
  userPhoto: PropTypes.string,
};

OAuthAnimation.defaultProps = {
  provider: null,
  userPhoto: null,
};

export default OAuthAnimation;
