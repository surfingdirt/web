import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate';
import routes from '~/routes';

import styles from './styles.scss';
import messages from '../messages';

const { LOGIN, REGISTRATION } = routes;

const SignInRegister = ({ t }) => {
  return (
    <div className="firebaseLoginExternalWrapper">
      <ul className="firebaseui-idp-list">
        <li className="firebaseui-list-item">
          <Link
            to={REGISTRATION}
            className={classnames(
              'firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-id-idp-button',
              styles.fakeFirebaseuiButton,
            )}
          >
            <span className={classnames('firebaseui-idp-text', styles.fakeFirebaseuiText)}>
              {t('registerLong')}
            </span>
          </Link>
        </li>
        <li className="firebaseui-list-item">
          <Link
            to={LOGIN}
            className={classnames(
              'firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-id-idp-button',
              styles.fakeFirebaseuiButton,
            )}
          >
            <span className={classnames('firebaseui-idp-text', styles.fakeFirebaseuiText)}>
              {t('loginLong')}
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

SignInRegister.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(SignInRegister);
