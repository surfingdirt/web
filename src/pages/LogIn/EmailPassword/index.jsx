/* eslint-disable import/prefer-default-export */

import React, { useState, useContext } from 'react';
import { Mutation } from 'react-apollo';

import LOGIN from 'Apollo/mutations/login.gql';
import AppContext from '~/contexts';

import messages from '../messages';
import PageContent from './pageContent';

const EmailPassword = () => {
  const {
    login: { onSuccess: onLoginSuccess, onFailure: onLoginFailure },
  } = useContext(AppContext);

  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async ({ username, userP }, mutate) => {
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
      setErrorMessage(null);
    } catch (e) {
      onLoginFailure();
      setErrorMessage('UserNotAuthorized');
    }
  };

  return (
    <Mutation mutation={LOGIN}>
      {(mutate) => (
        <PageContent errorMessage={errorMessage} onSubmit={(data) => handleLogin(data, mutate)} />
      )}
    </Mutation>
  );
};

export default EmailPassword;
