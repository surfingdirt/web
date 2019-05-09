/* eslint-disable import/prefer-default-export */

import LOGIN from 'Apollo/mutations/login.gql';
import Header from 'Components/Header';
import HeadMetaData from 'Components/HeadMetaData';
import PageContainer from 'Components/PageContainer';
import Translate from 'Hocs/Translate';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import contexts from '~/contexts';
import routes from '~/routes';

import messages from './messages';
import PageContent from './pageContent';

const { AppContext } = contexts;
const { HOME } = routes;

class LogInPage extends Component {
  static contextType = AppContext;

  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      errorMessage: null,
    };
  }

  async handleLogin({ email, password }, mutate) {
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
          password,
          email,
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
      props: { match, t },
      state: { errorMessage },
      context: {
        login: {
          data: { accessToken },
        },
      },
    } = this;
    const DESCRIPTION = t('description');
    const PICTURE = 'picture';
    const NAME = t('name');
    const { url } = match;

    if (accessToken) {
      return <Redirect to={HOME} />;
    }

    return (
      <PageContainer className="limitedWidthContent">
        <HeadMetaData description={DESCRIPTION} image={PICTURE} title={NAME} url={url} />
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
