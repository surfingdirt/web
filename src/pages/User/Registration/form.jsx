import React, { Fragment } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';

import Button, { buttonTypes } from 'Components/Widgets/Button/index';
import FormAPIMessage from 'Components/Widgets/Form/APIMessage';
import InputField from 'Components/Widgets/Form/InputField';
import Translate from 'Hocs/Translate';
import Validation from 'Utils/fieldLevelValidation';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';

import messages from './messages';
import styles from './styles.scss';

const { USER_NEW } = actions;
const { ACTION } = buttonTypes;

const FormContent = ({ initialErrors, initialValues, onSubmit, t }) => {
  const requiredValidator = Validation.required(t('required'));

  const validate = (values) => {
    const errors = {};
    return errors;
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
                  validate={requiredValidator}
                  initialError={combineAndTranslateErrors('username')}
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
                  initialError={combineAndTranslateErrors('email')}
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
                  initialError={combineAndTranslateErrors('userP')}
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
                  initialError={combineAndTranslateErrors('userPC')}
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
                  initialError={combineAndTranslateErrors('timezone')}
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
                  validate={requiredValidator}
                  initialError={combineAndTranslateErrors('locale')}
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
  initialValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialErrors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

FormContent.defaultProps = {};

export default Translate(messages)(FormContent);
