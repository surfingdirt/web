import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import qs from 'qs';

import CREATE_USER from 'Apollo/mutations/createUser.gql';
import FormAPIMessage from 'Components/Widgets/Form/APIMessage';
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

  const onSubmit = async (input) => {
    const errors = {};
    try {
      const result = await createUserMutation({ variables: { input } });
      console.log({ result });
    } catch (e) {
      const rawErrors = e.graphQLErrors[0].extensions.exception.errors;
      Object.entries(rawErrors).forEach(([name, errorList]) => {
        errors[name] = errorList.map((label, index) => (
          <FormAPIMessage key={index} message={label} />
        ));
      });
    }
    return errors;
  };

  if (data && data.createUser.userId) {
    return <p>Done!</p>;
  }

  const queryArgs = qs.parse(search.substr(1));
  const initialErrors = queryArgs.errors || {};
  const initialValues = queryArgs.values || {};

  return (
    <Card title={t('registration')} type={STANDARD}>
      <Paragraph>{t('explanations')}</Paragraph>
      {error && <p>Error</p>}
      {loading && <p>Loading</p>}
      <Form initialValues={initialValues} initialErrors={initialErrors} onSubmit={onSubmit} />
    </Card>
  );
};

Registration.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Registration);
