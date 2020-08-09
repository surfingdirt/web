import React, { useContext, useState } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/react-hooks';

import USERNAME_EXISTS from 'Apollo/queries/usernameExists3.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button/index';
import FormAPIMessage from 'Components/Widgets/Form/APIMessage';
import InputField from 'Components/Widgets/Form/InputField';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { ACTION } = buttonTypes;

const OAuthRegistrationForm = ({ initialErrors: _initialErrors, initialValues, onSubmit, t }) => {
  const existsMsg = <FormAPIMessage message="exists" className={styles.apiMessage} />;
  const requiredMsg = <FormAPIMessage message="required" className={styles.apiMessage} />;

  const { locale: currentLocale } = useContext(AppContext);
  const [usernameExistsQuery, { data, loading }] = useLazyQuery(USERNAME_EXISTS);
  const [checkedUsernames, setCheckedUsernames] = useState({});

  const initialErrors = { ..._initialErrors };

  const usernameData = data && data.usernameExists;
  if (usernameData) {
    if (!Object.keys(checkedUsernames).includes(usernameData.username)) {
      setCheckedUsernames(
        Object.assign({}, checkedUsernames, {
          [usernameData.username]: usernameData.exists,
        }),
      );
    }
  }

  const validate = ({ username, timezone, locale }) => {
    const errors = {};
    const hasUsername = Object.keys(checkedUsernames).includes(username);

    if (!username) {
      errors.username = requiredMsg;
    } else if (!loading && !hasUsername) {
      // Need to check this new username
      usernameExistsQuery({ variables: { username }, fetchPolicy: 'network-only' });
    } else if (checkedUsernames[username]) {
      errors.username = existsMsg;
    }

    if (!timezone) {
      errors.timezone = requiredMsg;
    }

    if (!locale) {
      errors.locale = requiredMsg;
    }

    return errors;
  };

  const getInitialError = (name) => {
    const error = initialErrors[name];
    if (!error) {
      return null;
    }
    return <FormAPIMessage message={error} className={styles.apiMessage} />;
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={(rawInput) => {
        const input = Object.assign({}, rawInput, {
          bio: { text: rawInput.bio, locale: currentLocale },
        });

        return onSubmit({ input });
      }}
      validate={validate}
      render={(formProps) => {
        const { handleSubmit, invalid, submitting } = formProps;
        return (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            method="POST"
            encType="multipart/form-data"
          >
            <div className={styles.inputsContainer}>
              <div className={styles.field}>
                <Field
                  name="username"
                  id="username"
                  component={InputField}
                  label={t('username')}
                  placeholder={t('inputPlaceholder')}
                  initialError={getInitialError('username')}
                  required
                />
              </div>
              <div className={styles.field}>
                <Field
                  name="timezone"
                  id="timezone"
                  component={InputField}
                  type="timezone"
                  label={t('timezone')}
                  unsetLabel={t('pickATimeZone')}
                  initialError={getInitialError('timezone')}
                  required
                />
              </div>
              <div className={styles.field}>
                <Field
                  name="locale"
                  id="locale"
                  component={InputField}
                  type="locale"
                  label={t('locale')}
                  unsetLabel={t('pickALocale')}
                  initialError={getInitialError('locale')}
                  required
                />
              </div>
            </div>
            <div className={styles.bottomContainer}>
              <Button
                type={ACTION}
                buttonType="submit"
                className={styles.submitButton}
                label={t('register')}
                disabled={submitting || invalid}
                loading={submitting}
              />
            </div>
          </form>
        );
      }}
    />
  );
};

OAuthRegistrationForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  initialErrors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(OAuthRegistrationForm);
