/* eslint-disable import/prefer-default-export */

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import LOGIN from 'Apollo/mutations/login.gql';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';
import routes from '~/routes';

import messages from '../messages';
import PageContent from './pageContent';

const { HOME } = routes;
const { STANDARD } = cardTypes;

const EmailPassword = ({ t }) => {
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
    <Card title={t('signIn')} type={STANDARD}>
      <Mutation mutation={LOGIN}>
        {(mutate) => (
          <PageContent errorMessage={errorMessage} onSubmit={(data) => handleLogin(data, mutate)} />
        )}
      </Mutation>
    </Card>
  );
};

EmailPassword.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(EmailPassword);
