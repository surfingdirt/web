/* eslint-disable import/prefer-default-export */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import LOGIN from 'Apollo/mutations/login.gql';
import Header from 'Components/Header';
import PageContainer from 'Components/PageContainer';
import Translate from 'Hocs/Translate';
import contexts from '~/contexts';
import routes from '~/routes';

import messages from './messages';
import PageContent from './pageContent';

const { AppContext } = contexts;
const { HOME } = routes;

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

  async handleLogin({ username, password }, mutate) {
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
          username,
          userP: password,
        },
      });
      const {
        data: { login },
      } = loginResponse;

      if (login.id) {
        onLoginSuccess(login);
        errorMessage = null;
      }
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
      <PageContainer className="limitedWidthContent">
        <Header type="main">{t('signIn')}</Header>
        <Mutation mutation={LOGIN}>
          {(mutate) => (
            <PageContent
              errorMessage={errorMessage}
              onSubmit={(data) => this.handleLogin(data, mutate)}
            />
          )}
        </Mutation>
      </PageContainer>
    );
  }
}

export const LogIn = Translate(messages)(LogInPage);
