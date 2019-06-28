/* global gapi */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import GOOGLE_LOGIN from 'Apollo/mutations/googleLogin.gql';
import Button from 'Components/Button';
import { InlineSpinner } from 'Components/Spinner';
import Translate from 'Hocs/Translate';
import Google from 'Images/_old/google.svg';

import AppContext from '~/contexts';

import messages from '../messages';
import styles from '../styles.scss';

class GoogleButton extends Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { loading: false };

    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    const {
      context: { googleClientId },
    } = this;

    ((d, s, id, callback) => {
      const js = d.createElement(s);
      const gs = d.getElementsByTagName(s)[0];

      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js';
      gs.parentNode.insertBefore(js, gs);
      js.onload = callback;
    })(document, 'script', 'google-platform', () => {
      gapi.load('auth2', () => {
        if (!gapi.auth2.getAuthInstance()) {
          gapi.auth2.init({
            client_id: googleClientId,
            fetch_basic_profile: true,
            scope: 'profile',
          });
        }
      });
    });
  }

  async handleLogin(mutate) {
    const auth2 = gapi.auth2.getAuthInstance();
    const {
      login: { onSuccess: onLoginSuccess, onFailure: onLoginFailure },
    } = this.context;

    try {
      const idToken = await auth2.signIn().then((googleUser) => googleUser.Zi.id_token);
      const loginResponse = await mutate({
        variables: {
          googleTokenId: idToken,
        },
      });
      const {
        data: { login },
      } = loginResponse;

      if (login.id) {
        onLoginSuccess(login);
      } else {
        onLoginFailure();
        this.setState({ loading: false });
      }
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  clickHandler(mutate) {
    this.setState({ loading: true });

    this.handleLogin(mutate);
  }

  render() {
    const {
      props: { t },
      state: { loading },
    } = this;

    return loading === true ? (
      <div className={`${styles.socialSpinner} ${styles.google}`}>
        <InlineSpinner className={styles.spinner} />
      </div>
    ) : (
      <Mutation mutation={GOOGLE_LOGIN}>
        {(mutate) => (
          <Button
            className={`${styles.socialLogin} ${styles.google}`}
            iconLeft={Google}
            onClick={() => {
              this.clickHandler(mutate);
            }}
            label={t('googleLogin')}
          />
        )}
      </Mutation>
    );
  }
}

export default Translate(messages)(GoogleButton);
