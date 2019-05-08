import Button from 'Components/Button';
import FacebookButton from 'Components/Button/Facebook';
import GoogleButton from 'Components/Button/Google';
import InputField from 'Components/Form/InputField';
import Translate from 'Hocs/Translate';
import PropTypes from 'prop-types';
import ArrowRight from 'Images/arrowRight2.svg';
import React, { Fragment, PureComponent } from 'react';
import { Field, Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import Validation from 'Utils/fieldLevelValidation';
import routes from '~/routes';

import translations from './messages';
import styles from './styles.scss';

const { FORGOT_PASSWORD, REGISTRATION_STEP1 } = routes;

const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

class SignInPageContent extends PureComponent {
  static propTypes = {
    errorMessage: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    errorMessage: '',
  };

  render() {
    const {
      props: { errorMessage, onSubmit, t },
    } = this;

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
              <div className={styles.inputsContainer}>
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
                <div className={styles.passwordField}>
                  <Field
                    name="password"
                    component={InputField}
                    type="password"
                    label={t('password')}
                    placeholder={t('inputPlaceholder')}
                    validate={requiredValidator}
                  />
                </div>
              </div>
              <div className={styles.bottomContainer}>
                <div className={styles.forgotPassword}>
                  <Link to={FORGOT_PASSWORD}>{t('forgotYourPassword')}</Link>
                </div>
                <Button
                  buttonType="submit"
                  className={styles.signInButton}
                  disabled={submitting}
                  label={t('signIn')}
                  loading={submitting}
                  type="negative"
                />
              </div>
              <div className={styles.separator}>
                <div className={styles.line} />
                <span>or</span>
                <div className={styles.line} />
              </div>
              <div className={styles.socialLogins}>
                <FacebookButton />
                <GoogleButton />
              </div>
            </form>
            <div className={styles.noAccountContainer}>
              <h2 className={styles.noAccountTitle}>{t('noAccount')}</h2>
              <p className={styles.noAccountSubtitle}>{t('noAccountSubtitle')}</p>
              <p className={styles.noAccountFeature}>{t('noAccountFeature1')}</p>
              <p className={styles.noAccountFeature}>{t('noAccountFeature2')}</p>
              <p className={styles.noAccountFeature}>{t('noAccountFeature3')}</p>
              <p className={styles.noAccountFeature}>{t('noAccountFeature4')}</p>
              <div className={styles.register}>
                <Button
                  iconRight={ArrowRight}
                  buttonType="link"
                  className={styles.registerButton}
                  label={t('register')}
                  href={REGISTRATION_STEP1}
                />
              </div>
            </div>
          </Fragment>
        )}
      />
    );
  }
}

export default Translate(translations)(SignInPageContent);
