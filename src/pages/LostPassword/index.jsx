import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';

import FORGOT_PASSWORD from 'Apollo/mutations/forgotPassword.gql';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Translate from 'Hocs/Translate';

import messages from './messages';
import Form from './form';

const { STANDARD } = cardTypes;

const LostPassword = (props) => {
  const {
    location: { search },
    t,
  } = props;

  const query = new URLSearchParams(search);
  const doneQueryArg = !!query.get('done');

  const [done, setDone] = useState(doneQueryArg);
  const [errorMessage, setErrorMessage] = useState(null);
  const [forgotPasswordMutation, { error: mutationError }] = useMutation(FORGOT_PASSWORD);

  const handleSubmit = async ({ username }, forgotPassword) => {
    const forgotPasswordResponse = await forgotPassword({
      variables: {
        input: { username },
      },
    });

    const {
      data: { forgotPassword: status },
    } = forgotPasswordResponse;
    if (!status) {
      setErrorMessage(t('backendError'));
    } else {
      setDone(true);
    }
  };

  if (mutationError) {
    setErrorMessage(t('mutationError'));
  }

  const content = done ? (
    <p>{t('done')}</p>
  ) : (
    <Form
      errorMessage={errorMessage}
      onSubmit={(data) => handleSubmit(data, forgotPasswordMutation)}
    />
  );

  return (
    <Card title={t('lostYourPassword')} type={STANDARD}>
      {content}
    </Card>
  );
};

LostPassword.propTypes = {
  location: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(LostPassword);
