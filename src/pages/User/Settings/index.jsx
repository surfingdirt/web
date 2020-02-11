import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { ApolloConsumer } from '@apollo/react-hooks';
import qs from 'qs';

import UPDATE_SETTINGS from 'Apollo/mutations/updateSettings2.gql';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Paragraph from 'Components/Widgets/Paragraph';
import Spinner from 'Components/Widgets/Spinner';
import Translate from 'Hocs/Translate';
import { settingsSaveSucessRoute } from 'Utils/links';
import { handleMutationSubmit } from 'Utils/misc';
import AppContext from '~/contexts';

import messages from './messages';
import Form from './form';

const { STANDARD } = cardTypes;

const Settings = (props) => {
  const {
    t,
    location: { search },
  } = props;

  const context = useContext(AppContext);
  const {
    login: {
      data: {
        me: { email, locale, timezone, userId },
      },
    },
  } = context;
  const [updateUserMutation, { data, loading }] = useMutation(UPDATE_SETTINGS);
  const onSubmit = handleMutationSubmit(updateUserMutation);

  const queryArgs = qs.parse(search.substr(1));
  const success = !!queryArgs.success;
  const initialErrors = queryArgs.errors || {};
  const initialValues = Object.assign({ email, locale, timezone, userId }, queryArgs.values);

  let content;
  if (success) {
    content = (
      <>
        <Paragraph>{t('saveSuccessful')}</Paragraph>
      </>
    );
  } else if (loading) {
    content = <Spinner negative />;
  } else if (data) {
    // Reload the page with a query param to say it worked
    window.location = settingsSaveSucessRoute();
  } else {
    content = (
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
    );
  }

  return (
    <Card title={t('settings')} type={STANDARD}>
      {content}
    </Card>
  );
};

Settings.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Settings);
