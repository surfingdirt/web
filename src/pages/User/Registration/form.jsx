import React from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';

import EMAIL_EXISTS from 'Apollo/queries/emailExists.gql';
import USERNAME_EXISTS from 'Apollo/queries/usernameExists.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button/index';
import FormAPIMessage from 'Components/Widgets/Form/APIMessage';
import InputField from 'Components/Widgets/Form/InputField';
import Translate from 'Hocs/Translate';
import { isValidEmail, isPasswordLongEnough } from 'Utils/validators';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';

import messages from './messages';
import styles from './styles.scss';
import { InlineSpinner } from 'Components/Widgets/Spinner';

const { USER_NEW } = actions;
const { ACTION } = buttonTypes;

const DEBOUNCE_TIMEOUT = 300;

const checkedUsernames = {};
let usernameTimeout = null;
const checkedEmails = {};
let emailTimeout = null;

const FormContent = ({ initialErrors, initialValues, onSubmit, runQuery, t }) => {
  const validate = ({ username, email, userP, userPC, timezone, locale }) => {
    return new Promise((resolveValidation) => {
      const required = <FormAPIMessage message="required" className={styles.apiMessage} />;
      const errors = {};
      const promises = [];

      if (!username) {
        errors.username = required;
      } else if (!Object.keys(checkedUsernames).includes(username)) {
        promises.push(
          new Promise((resolveUsername, reject) => {
            clearTimeout(usernameTimeout);
            usernameTimeout = setTimeout(() => {
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
                  reject(error);
                });
            }, DEBOUNCE_TIMEOUT);
          }),
        );
        // }, DEBOUNCE_TIMEOUT);
      } else if (checkedUsernames[username]) {
        errors.username = <FormAPIMessage message="exists" className={styles.apiMessage} />;
      }

      if (!email) {
        errors.email = required;
      } else if (!isValidEmail(email)) {
        errors.email = <FormAPIMessage message="emailInvalid" className={styles.apiMessage} />;
      } else if (!Object.keys(checkedEmails).includes(email)) {
        promises.push(
          new Promise((resolveEmail, reject) => {
            clearTimeout(emailTimeout);
            emailTimeout = setTimeout(() => {
              runQuery({
                query: EMAIL_EXISTS,
                variables: { email },
                fetchPolicy: 'network-only',
              })
                .then(({ data }) => {
                  const exists = !!data.emailExists;
                  checkedEmails[email] = exists;
                  if (exists) {
                    errors.email = (
                      <FormAPIMessage message="exists" className={styles.apiMessage} />
                    );
                  }
                  resolveEmail(exists);
                })
                .catch((error) => {
                  reject(error);
                });
            }, DEBOUNCE_TIMEOUT);
          }),
        );
      } else if (checkedEmails[email]) {
        errors.email = <FormAPIMessage message="exists" className={styles.apiMessage} />;
      }

      if (!userP) {
        errors.userP = required;
      } else if (!isPasswordLongEnough(userP)) {
        errors.userP = <FormAPIMessage message="tooShort" className={styles.apiMessage} />;
      }

      if (!userPC) {
        errors.userPC = required;
      } else if (userPC !== userP) {
        errors.userPC = <FormAPIMessage message="notSame" className={styles.apiMessage} />;
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
      onSubmit={onSubmit}
      validate={validate}
      render={(formProps) => {
        const { handleSubmit, invalid, submitting } = formProps;
        return (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            method="POST"
            action={actionRoute(USER_NEW)}
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
                  name="email"
                  id="email"
                  component={InputField}
                  label={t('email')}
                  placeholder={t('inputPlaceholder')}
                  initialError={combineAndTranslateErrors('email')}
                  required
                />
              </div>
              <div className={styles.field}>
                <Field
                  name="userP"
                  id="userP"
                  component={InputField}
                  type="password"
                  label={t('password')}
                  placeholder={t('inputPlaceholder')}
                  initialError={combineAndTranslateErrors('userP')}
                  required
                />
              </div>
              <div className={styles.field}>
                <Field
                  name="userPC"
                  id="userPC"
                  component={InputField}
                  type="password"
                  label={t('passwordConfirmation')}
                  placeholder={t('inputPlaceholder')}
                  initialError={combineAndTranslateErrors('userPC')}
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

FormContent.propTypes = {
  initialValues: PropTypes.object.isRequired,
  initialErrors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  runQuery: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(FormContent);
