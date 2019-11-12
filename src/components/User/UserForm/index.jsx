import classnames from 'classnames';
import Button from 'Components/Widgets/Button/index';
import CheckboxField from 'Components/Widgets/Form/CheckboxField/index';
import InputField from 'Components/Widgets/Form/InputField/index';
import Translate from 'Hocs/Translate/index';
import Next from 'Images/_old/arrow-next.svg';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import Validation from 'Utils/fieldLevelValidation';

import messages from './messages';
import styles from './styles.scss';

const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

function getSectionClassName(className) {
  return classnames(className, styles.section);
}

class UserForm extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.validate = this.validate.bind(this);
  }

  validate(values) {
    const errors = {};
    const { t } = this.props;

    if (!values.password && !values.passwordConfirmation) {
      return errors;
    }

    if (values.password !== values.passwordConfirmation) {
      try {
        errors.passwordConfirmation = t('passwordMismatch');
      } catch (e) {
        // Final form runs validations on unmount, which causes
        // errors because translations are gone.
        // @see https://github.com/final-form/react-final-form/issues/408
      }
    }

    return errors;
  }

  render() {
    const { t, onSubmit } = this.props;

    const emailValidator = Validation.email(t('email'));
    const requiredValidator = Validation.required(t('required'));

    return (
      <Form
        onSubmit={onSubmit}
        validate={this.validate}
        render={({ handleSubmit, submitting, submitError, errors }) => (
          <div className={styles.container}>
            {submitError && <p className={styles.errorMessage}>{submitError}</p>}
            <form onSubmit={handleSubmit}>
              <div className={styles.rowContainer}>
                <div className={getSectionClassName(styles.usernameField)}>
                  <Field
                    name="username"
                    component={InputField}
                    type="text"
                    label={t('username')}
                    placeholder={t('inputPlaceholder')}
                    validate={composeValidators(requiredValidator)}
                  />
                </div>

                <div className={getSectionClassName(styles.firstnameField)}>
                  <Field
                    name="firstname"
                    component={InputField}
                    type="text"
                    label={t('firstname')}
                    placeholder={t('inputPlaceholder')}
                    validate={composeValidators(requiredValidator)}
                  />
                </div>
              </div>

              <div className={styles.rowContainer}>
                <div className={getSectionClassName(styles.lastnameField)}>
                  <Field
                    name="lastname"
                    component={InputField}
                    type="text"
                    label={t('lastname')}
                    placeholder={t('inputPlaceholder')}
                    validate={composeValidators(requiredValidator)}
                  />
                </div>

                <div className={getSectionClassName(styles.emailField)}>
                  <Field
                    name="email"
                    component={InputField}
                    type="email"
                    label={t('email')}
                    placeholder={t('inputPlaceholder')}
                    validate={composeValidators(requiredValidator, emailValidator)}
                  />
                </div>
              </div>

              <div className={styles.rowContainer}>
                <div className={getSectionClassName(styles.passwordField)}>
                  <Field
                    name="password"
                    component={InputField}
                    type="password"
                    label={t('password')}
                    placeholder={t('inputPlaceholder')}
                    validate={requiredValidator}
                  />
                </div>

                <div className={getSectionClassName(styles.passwordConfirmationField)}>
                  <Field
                    name="passwordConfirmation"
                    component={InputField}
                    type="password"
                    label={t('passwordConfirmation')}
                    placeholder={t('inputPlaceholder')}
                    errorLabel={errors.passwordConfirmation}
                    validate={requiredValidator}
                  />
                </div>
              </div>

              <div className={styles.legend}>{t('requiredLegend')}</div>
              <div className={styles.bottomContainer}>
                <div className={styles.privacy}>
                  <p className={styles.yourPrivacyTitle}>{t('yourPrivacy')}</p>
                  <p className={styles.yourPrivacyDescription}>{t('privacyDescription')}</p>
                </div>
                <div className={styles.clickToAction}>
                  <div className={styles.checkbox}>
                    <Field
                      name="privacy"
                      component={CheckboxField}
                      type="checkbox"
                      label={t('checkboxLabel')}
                      validate={requiredValidator}
                    />
                  </div>
                  <Button
                    buttonType="submit"
                    label={t('createAccount')}
                    disabled={submitting}
                    loading={submitting}
                    iconRight={Next}
                  />
                </div>
              </div>
            </form>
          </div>
        )}
      />
    );
  }
}

export default Translate(messages)(UserForm);
