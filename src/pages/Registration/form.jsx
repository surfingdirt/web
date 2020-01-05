import React, { Fragment } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';

import Button, { buttonTypes } from 'Components/Widgets/Button/index';
import InputField from 'Components/Widgets/Form/InputField';
import Translate from 'Hocs/Translate';
import Validation from 'Utils/fieldLevelValidation';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';

import messages from './messages';
import styles from './styles.scss';

const { LOGIN } = actions;
const { ACTION } = buttonTypes;

const FormContent = ({ errorMessage, onSubmit, t }) => {
  const requiredValidator = Validation.required(t('required'));

  return (
    <Form
      onSubmit={onSubmit}
      render={(formProps) => {
        const { handleSubmit, invalid, submitting } = formProps;
        return (
          <Fragment>
            <p className={styles.errorMessage} hidden={!errorMessage}>
              {errorMessage}
            </p>
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              method="POST"
              encType="multipart/form-data"
              action={actionRoute(LOGIN)}
            >
              <div className={styles.inputsContainer}>
                <div className={styles.field}>
                  <Field
                    name="username"
                    id="username"
                    component={InputField}
                    label={t('username')}
                    placeholder={t('inputPlaceholder')}
                    validate={requiredValidator}
                  />
                </div>
                <div className={styles.field}>
                  <Field
                    name="email"
                    id="email"
                    component={InputField}
                    label={t('email')}
                    placeholder={t('inputPlaceholder')}
                    validate={requiredValidator}
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
                    validate={requiredValidator}
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
                    validate={requiredValidator}
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
                    validate={requiredValidator}
                  />
                </div>{' '}
                <div className={styles.field}>
                  <Field
                    name="locale"
                    id="locale"
                    component={InputField}
                    type="locale"
                    label={t('locale')}
                    unsetLabel={t('pickALocale')}
                    validate={requiredValidator}
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
          </Fragment>
        );
      }}
    />
  );
};

FormContent.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

FormContent.defaultProps = {
  errorMessage: null,
};

export default Translate(messages)(FormContent);
