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

const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

class ForgotPasswordPageContent extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    errorMessage: '',
  };

  render() {
    const { errorMessage, onSubmit, t } = this.props;

    const emailValidator = Validation.email(t('email'));
    const requiredValidator = Validation.required(t('required'));

    return (
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting }) => (
          <Fragment>
            <p className={styles.errorMessage} hidden={!errorMessage}>
              {errorMessage}
            </p>
            <form onSubmit={handleSubmit}>
              <div className={styles.emailField}>
                <Field
                  name="email"
                  component={InputField}
                  type="email"
                  label={t('email')}
                  placeholder={t('inputPlaceholder')}
                  validate={composeValidators(requiredValidator, emailValidator)}
                />
              </div>
              <div className={styles.bottomContainer}>
                <Button
                  buttonType="submit"
                  label={t('send')}
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

export default Translate(messages)(ForgotPasswordPageContent);
