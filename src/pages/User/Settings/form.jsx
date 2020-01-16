import React from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';

import EMAIL_EXISTS from 'Apollo/queries/emailExists.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button/index';
import FormAPIMessage from 'Components/Widgets/Form/APIMessage';
import InputField from 'Components/Widgets/Form/InputField';
import Paragraph from 'Components/Widgets/Paragraph';
import Translate from 'Hocs/Translate';
import { isValidEmail, isPasswordLongEnough } from 'Utils/validators';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { SETTINGS } = actions;
const { ACTION, NEGATIVE } = buttonTypes;
const { PROFILE } = routes;

const DEBOUNCE_TIMEOUT = 300;

const checkedEmails = {};
let emailTimeout = null;

const FormContent = ({ initialErrors, initialValues, onSubmit, runQuery, t, userId }) => {
  const validate = ({ email, userPO, userP, userPC, timezone, locale }) => {
    return new Promise((resolveValidation) => {
      const required = <FormAPIMessage message="required" className={styles.apiMessage} />;
      const errors = {};
      const promises = [];

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

      if (userP || userPC) {
        if (!userPO) {
          errors.userPO = required;
        }

        if (!isPasswordLongEnough(userP)) {
          errors.userP = <FormAPIMessage message="tooShort" className={styles.apiMessage} />;
        }
        if (userPC !== userP) {
          errors.userPC = <FormAPIMessage message="notSame" className={styles.apiMessage} />;
        }
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
    <>
      <Form
        initialValues={initialValues}
        onSubmit={(values) => onSubmit({ input: values })}
        validate={validate}
        render={(formProps) => {
          const { handleSubmit, invalid, submitting } = formProps;
          return (
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              method="POST"
              action={actionRoute(SETTINGS)}
              encType="multipart/form-data"
            >
              <div className={styles.inputsContainer}>
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

                <details className={styles.passwordChangeWrapper}>
                  <summary className={styles.passwordSectionSummary}>
                    <Paragraph className={styles.passwordSectionParagraph} dataContent={t('show')}>
                      {t('passwordUpdate')}
                    </Paragraph>
                  </summary>
                  <div className={styles.passwords}>
                    <div className={styles.field}>
                      <Field
                        name="userP"
                        id="userP"
                        component={InputField}
                        type="password"
                        label={t('newPassword')}
                        placeholder={t('inputPlaceholder')}
                        initialError={combineAndTranslateErrors('userP')}
                        required={false}
                      />
                    </div>
                    <div className={styles.field}>
                      <Field
                        name="userPC"
                        id="userPC"
                        component={InputField}
                        type="password"
                        label={t('newPasswordConfirmation')}
                        placeholder={t('inputPlaceholder')}
                        initialError={combineAndTranslateErrors('userPC')}
                        required={false}
                      />
                    </div>
                    <div className={styles.field}>
                      <Field
                        name="userPO"
                        id="userPO"
                        component={InputField}
                        type="password"
                        label={t('oldPassword')}
                        placeholder={t('inputPlaceholder')}
                        initialError={combineAndTranslateErrors('userPO')}
                        required={false}
                      />
                    </div>
                  </div>
                </details>
              </div>
              <div className={styles.bottomContainer}>
                <Field name="userId">
                  {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
                </Field>
                <Button
                  type={ACTION}
                  buttonType="submit"
                  className={styles.submitButton}
                  label={t('save')}
                  disabled={submitting || invalid}
                  loading={submitting}
                />
              </div>
            </form>
          );
        }}
      />
      <Paragraph>{t('lookingForHowTo')}</Paragraph>
      <Paragraph>{t('goToProfile')}</Paragraph>
      <Button href={PROFILE} label={t('profilePage')} type={NEGATIVE} />
    </>
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
