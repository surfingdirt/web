import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';

import FORGOT_PASSWORD from 'Apollo/mutations/forgotPassword.gql';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Translate from 'Hocs/Translate';

import messages from './messages';
import Form from './form';
import Paragraph from 'Components/Widgets/Paragraph';

const { STANDARD } = cardTypes;

const Registration = (props) => {
  const { t } = props;

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
    }
  };

  if (mutationError) {
    setErrorMessage(t('mutationError'));
  }

  return (
    <Card title={t('registration')} type={STANDARD}>
      <Paragraph>{t('explanations')}</Paragraph>
      <Form
        errorMessage={errorMessage}
        onSubmit={(data) => handleSubmit(data, forgotPasswordMutation)}
      />
    </Card>
  );
};

Registration.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Registration);
