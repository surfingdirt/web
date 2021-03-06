import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import classnames from 'classnames';
import StyledFirebaseAuth from 'react-firebaseui/FirebaseAuth';

import Spinner from 'Components/Widgets/Spinner';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';
import routes from '~/routes';

import messages from '../messages';
import styles from './styles.scss';

const { LOGIN_OAUTH } = routes;
const AUTH_METHOD = 'redirect';
const AUTH_DESTINATION_AFTER_LOGIN = LOGIN_OAUTH;

const FirebaseAuth = ({ locale }) => {
  const langClassName = `lang-${locale.split('-')[0]}`;
  const [ready, setReady] = useState(false);
  const { firebaseConfig } = useContext(AppContext);

  const signInSuccessUrl = AUTH_DESTINATION_AFTER_LOGIN;
  const uiConfig = {
    credentialHelper: 'none',
    signInFlow: AUTH_METHOD,
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl,
  };

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    setReady(true);
  }, []);

  if (ready) {
    // Solution taken from:
    // https://github.com/firebase/firebaseui-web-react/issues/21#issuecomment-602180824
    return (
      <StyledFirebaseAuth
        className={classnames('firebaseLoginExternalWrapper', styles[langClassName])}
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    );
  }
  return <Spinner negative containerClassName={styles.spinner} />;
};

FirebaseAuth.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default Translate(messages)(FirebaseAuth);
