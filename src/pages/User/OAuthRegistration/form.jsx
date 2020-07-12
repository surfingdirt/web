import React, { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';

import EMAIL_EXISTS from 'Apollo/queries/emailExists.gql';
import USERNAME_EXISTS from 'Apollo/queries/usernameExists.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button/index';
import FormAPIMessage from 'Components/Widgets/Form/APIMessage';
import InputField from 'Components/Widgets/Form/InputField';
import Translate from 'Hocs/Translate';
import { isValidEmail, isPasswordLongEnough } from 'Utils/validators';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { ACTION } = buttonTypes;

const checkedUsernames = {};
const checkedEmails = {};

const OAuthRegistrationForm = ({ initialErrors, initialValues, onSubmit, runQuery, t }) => {
  const { locale: currentLocale } = useContext(AppContext);

  const validate = ({ username, timezone, locale }) => {
    return new Promise((resolveValidation) => {
      const required = <FormAPIMessage message="required" className={styles.apiMessage} />;
      const errors = {};
      const promises = [];

      if (!username) {
        errors.username = required;
      } else if (!Object.keys(checkedUsernames).includes(username)) {
        promises.push(
          new Promise((resolveUsername, reject) => {
            // clearTimeout(usernameTimeout);
            // usernameTimeout = setTimeout(() => {
            runQuery({
              query: USERNAME_EXISTS,
              variables: { username },
              fetchPolicy: 'network-only',
            })
              .then(({ data }) => {
                const exists = !!data.usernameExists;
                checkedUsernames[username] = exists;
                if (exists) {
                  errors.username = (
                    <FormAPIMessage message="exists" className={styles.apiMessage} />
                  );
                }
                resolveUsername(exists);
              })
              .catch((error) => {
                console.error('resolveUsername error', error);
                reject(error);
              });
            // }, DEBOUNCE_TIMEOUT);
          }),
        );
      } else if (checkedUsernames[username]) {
        errors.username = <FormAPIMessage message="exists" className={styles.apiMessage} />;
      }

      if (!timezone) {
        errors.timezone = required;
      }

      if (!locale) {
        errors.locale = required;
      }
      Promise.all(promises)
        .then(() => {
          resolveValidation(errors);
        })
        .catch((e) => {
          console.error('Error while validating', e);
        });
    });
  };

  const combineAndTranslateErrors = (name) => {
    const errors = initialErrors[name];
    if (!errors) {
      return null;
    }

    return (
      <>
        {errors.map((label, index) => (
          <FormAPIMessage key={index} message={label} className={styles.apiMessage} />
        ))}
      </>
    );
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
                  initialError={combineAndTranslateErrors('username')}
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
                  initialError={combineAndTranslateErrors('timezone')}
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
                  initialError={combineAndTranslateErrors('locale')}
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
  runQuery: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(OAuthRegistrationForm);
