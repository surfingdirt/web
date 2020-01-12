import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import qs from 'qs';

import CREATE_USER from 'Apollo/mutations/createUser.gql';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Translate from 'Hocs/Translate';

import messages from './messages';
import Form from './form';
import Paragraph from 'Components/Widgets/Paragraph';

const { STANDARD } = cardTypes;

const Registration = (props) => {
  const {
    t,
    location: { search },
  } = props;

  const [createUserMutation, { data, error, loading }] = useMutation(CREATE_USER);

  const handleSubmit = (input) => {
    createUserMutation({ variables: { input } });
  };

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  if (data && data.createUser.userId) {
    return <p>Done!</p>;
  }

  const queryArgs = qs.parse(search.substr(1));
  const initialErrors = queryArgs.errors || {};
  const initialValues = queryArgs.values || {};

  return (
    <Card title={t('registration')} type={STANDARD}>
      <Paragraph>{t('explanations')}</Paragraph>
      <Form
        initialValues={initialValues}
        initialErrors={initialErrors}
        onSubmit={(input) => handleSubmit(input)}
      />
    </Card>
  );
};

Registration.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Registration);
