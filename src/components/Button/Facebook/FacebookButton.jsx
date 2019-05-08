/* global FB */

import FACEBOOK_LOGIN from 'Apollo/mutations/facebookLogin.gql';
import Button from 'Components/Button/Button';
import Translate from 'Hocs/Translate';
import Facebook from 'Images/facebook-logo-white.svg';
import { InlineSpinner } from 'Components/Spinner';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import contexts from '~/contexts';

import messages from '../messages';
import styles from '../styles.scss';

const { AppContext } = contexts;

class FacebookButton extends Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { mutate: () => {}, loading: false };

    this.checkLoginState = this.checkLoginState.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    const { facebookAppId } = this.context;

    ((d, s, id) => {
      const js = d.createElement(s);
      const fjs = d.getElementsByTagName(s)[0];

      if (d.getElementById(id)) {
        return;
      }

      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: facebookAppId,
        cookie: true,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.2',
      });
    };
  }

  async responseApi(authResponse) {
    const {
      context: {
        login: { onSuccess: onLoginSuccess, onFailure: onLoginFailure },
      },
      state: { mutate },
    } = this;

    try {
      const loginResponse = await mutate({
        variables: {
          facebookAccessToken: authResponse.accessToken,
        },
      });
      const {
        data: { login },
      } = loginResponse;
      if (login.id) {
        onLoginSuccess(login);
      }
    } catch (e) {
      onLoginFailure();
      this.setState({ loading: false });
    }
  }

  checkLoginState(response) {
    this.responseApi(response.authResponse);
  }

  clickHandler(mutate) {
    this.setState({ mutate, loading: true });

    FB.login(this.checkLoginState);
  }

  render() {
    const {
      props: { t },
      state: { loading },
    } = this;

    return loading ? (
      <div className={`${styles.socialSpinner} ${styles.facebook}`}>
        <InlineSpinner className={styles.spinner} />
      </div>
    ) : (
      <Mutation mutation={FACEBOOK_LOGIN}>
        {(mutate) => (
          <Button
            className={`${styles.socialLogin} ${styles.facebook}`}
            label={t('facebookLogin')}
            iconLeft={Facebook}
            onClick={() => {
              this.clickHandler(mutate);
            }}
          />
        )}
      </Mutation>
    );
  }
}

export default Translate(messages)(FacebookButton);
