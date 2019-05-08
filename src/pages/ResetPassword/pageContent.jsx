/* eslint-disable react/prefer-stateless-function */

import Button from 'Components/Button';
import InputField from 'Components/Form/InputField';

import Translate from 'Hocs/Translate';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Field, Form } from 'react-final-form';

import Validation from 'Utils/fieldLevelValidation';

import messages from './messages';

import styles from './styles.scss';

const validate = (values) => {
  const errors = {};
  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Password mismatched';
  }
  return errors;
};

const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

class ResetPasswordPageContent extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  render() {
    const { onSubmit, t } = this.props;

    const requiredValidator = Validation.required(t('required'));

    return (
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting }) => (
          <Fragment>
            <form onSubmit={handleSubmit}>
              <div className={styles.passwordField}>
                <Field
                  name="password"
                  component={InputField}
                  type="password"
                  label={t('password')}
                  placeholder={t('inputPlaceholder')}
                  validate={composeValidators(requiredValidator)}
                />
              </div>
              <div className={styles.passwordField}>
                <Field
                  name="passwordConfirmation"
                  component={InputField}
                  type="password"
                  label={t('passwordConfirmation')}
                  placeholder={t('inputPlaceholder')}
                  validate={composeValidators(requiredValidator)}
                />
              </div>
              <div className={styles.bottomContainer}>
                <Button
                  buttonType="submit"
                  label={t('resetPasswordButton')}
                  disabled={submitting}
                  loading={submitting}
                />
              </div>
            </form>
          </Fragment>
        )}
      />
    );
  }
}

export default Translate(messages)(ResetPasswordPageContent);
