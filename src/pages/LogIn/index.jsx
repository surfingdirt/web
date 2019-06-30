/* eslint-disable import/prefer-default-export */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router';

import LOGIN from 'Apollo/mutations/login.gql';
import Header, {headerTypes} from 'Components/Header';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';
import routes from '~/routes';

import messages from './messages';
import PageContent from './pageContent';

const { HOME } = routes;
const { PRIMARY } = headerTypes;

class LogInPage extends Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      errorMessage: null,
    };
  }

  async handleLogin({ username, userP }, mutate) {
    const {
      context: {
        login: { onSuccess: onLoginSuccess, onFailure: onLoginFailure },
      },
      props: { t },
    } = this;

    let errorMessage;

    try {
      const loginResponse = await mutate({
        variables: {
          input: {
            username,
            userP,
          },
        },
      });
      const {
        data: { login },
      } = loginResponse;

      if (!login.uid) {
        throw new Error('Bad response');
      }

      onLoginSuccess(login);
      errorMessage = null;
    } catch (e) {
      onLoginFailure();
      errorMessage = t('UserNotAuthorized');
    }

    this.setState({ errorMessage });
  }

  render() {
    const {
      props: { t },
      state: { errorMessage },
      context: {
        login: {
          data: { accessToken },
        },
      },
    } = this;

    if (accessToken) {
      return <Redirect to={HOME} />;
    }

    return (
      <Fragment>
        <Header type={PRIMARY}>{t('signIn')}</Header>
        <Mutation mutation={LOGIN}>
          {(mutate) => (
            <PageContent
              errorMessage={errorMessage}
              onSubmit={(data) => this.handleLogin(data, mutate)}
            />
          )}
        </Mutation>
      </Fragment>
    );
  }
}

export const LogIn = Translate(messages)(LogInPage);
