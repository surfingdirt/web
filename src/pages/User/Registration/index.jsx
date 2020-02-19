import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { ApolloConsumer } from '@apollo/react-hooks';
import qs from 'qs';

import CREATE_USER from 'Apollo/mutations/createUser.gql';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Heading, { headingTypes } from 'Components/Widgets/Heading';
import Paragraph from 'Components/Widgets/Paragraph';
import Spinner from 'Components/Widgets/Spinner';
import Translate from 'Hocs/Translate';
import { handleMutationSubmit } from 'Utils/misc';

import messages from './messages';
import Form from './form';

const { STANDARD } = cardTypes;
const { SECONDARY } = headingTypes;

const Registration = (props) => {
  const {
    t,
    location: { search },
  } = props;

  const [createUserMutation, { data, loading }] = useMutation(CREATE_USER);
  const onSubmit = handleMutationSubmit(createUserMutation);

  const queryArgs = qs.parse(search.substr(1));
  const initialErrors = queryArgs.errors || {};
  const initialValues = queryArgs.values || {};

  let content;
  if (data) {
    const {
      createUser: { username },
    } = data;
    content = (
      <>
        <Heading type={SECONDARY}>{t('welcome').replace('%s', username)}</Heading>
        <Paragraph>{t('needConfirmation')}</Paragraph>
        <Paragraph>{t('seeYouSoon')}</Paragraph>
      </>
    );
  } else if (loading) {
    content = <Spinner negative />;
  } else {
    content = (
      <>
        <Paragraph>{t('explanations')}</Paragraph>
        <ApolloConsumer>
          {(client) => (
            <Form
              runQuery={client.query}
              initialValues={initialValues}
              initialErrors={initialErrors}
              onSubmit={onSubmit}
            />
          )}
        </ApolloConsumer>
      </>
    );
  }

  return (
    <Card title={t('registration')} type={STANDARD}>
      {content}
    </Card>
  );
};

Registration.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Registration);
