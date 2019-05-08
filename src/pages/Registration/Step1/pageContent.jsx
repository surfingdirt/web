/* eslint-disable import/prefer-default-export, react/prefer-stateless-function */

import { translateParsedErrors } from 'Apollo/exceptionParser';
import LOGIN from 'Apollo/mutations/login.gql';
import SIGNUP from 'Apollo/mutations/signup.gql';
import Spinner from 'Components/Spinner';
import UserForm from 'Components/UserForm';
import Translate from 'Hocs/Translate';
import PropTypes from 'prop-types';
import React from 'react';
import { graphql, Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import contexts from '~/contexts';
import routes from '~/routes';
import messages from '../messages';

import SignupStates from './SignupStates';

const { AppContext } = contexts;
const { REGISTRATION_STEP2 } = routes;
const {
  SIGNUP_STATE_1_REGISTRATION,
  SIGNUP_STATE_2_LOGIN,
  SIGNUP_STATE_3_REDIRECT,
  SIGNUP_STATE_LOGIN_ERROR,
} = SignupStates;

class PageContentRaw extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    goToState: PropTypes.func.isRequired,
    signUpState: PropTypes.string.isRequired,
  };

  // noinspection JSUnusedGlobalSymbols
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.handleUserCreation = this.handleUserCreation.bind(this);
    this.login = this.login.bind(this);
  }

  async handleUserCreation({ username, email, password, passwordConfirmation }, mutate) {
    const { goToState, t } = this.props;

    try {
      await mutate({
        variables: {
          username,
          email,
          password,
          passwordConfirmation,
        },
      });
    } catch (e) {
      return translateParsedErrors(e, t('creationError'), t);
    }

    goToState(SIGNUP_STATE_2_LOGIN);
    // No need to wait for the promise.
    this.login(email, password);

    return null;
  }

  async login(email, password) {
    const { goToState, loginMutation } = this.props;
    const {
      login: { onSuccess: onLoginSuccess, onFailure: onLoginFailure },
    } = this.context;

    const {
      data: { login },
    } = await loginMutation({ variables: { email, password } });

    if (login.id) {
      onLoginSuccess(login);
      // Hard reload in order to update ME in the context
      global.window.location = REGISTRATION_STEP2;
    } else {
      onLoginFailure();
      goToState(SIGNUP_STATE_LOGIN_ERROR);
    }
  }

  render() {
    const { t, signUpState } = this.props;
    const {
      login: {
        data: { accessToken },
      },
    } = this.context;
    if (accessToken) {
      return <Redirect to={REGISTRATION_STEP2} />;
    }

    switch (signUpState) {
      case SIGNUP_STATE_1_REGISTRATION:
        return (
          <Mutation mutation={SIGNUP}>
            {(mutate) => <UserForm onSubmit={(data) => this.handleUserCreation(data, mutate)} />}
          </Mutation>
        );
      case SIGNUP_STATE_2_LOGIN:
        return <Spinner />;
      case SIGNUP_STATE_3_REDIRECT:
        return <Redirect to={REGISTRATION_STEP2} />;
      case SIGNUP_STATE_LOGIN_ERROR:
        return <p>{t('loginError')}</p>;
      default:
        return <div />;
    }
  }
}

export const PageContent = graphql(LOGIN, { name: 'loginMutation' })(
  Translate(messages)(PageContentRaw),
);
