import Button from 'Components/Button/index';
import InputField from 'Components/Form/InputField';
import Translate from 'Hocs/Translate';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { Field, Form } from 'react-final-form';
import actions from '~/actions';
import Validation from 'Utils/fieldLevelValidation';
import { actionRoute } from 'Utils/links';

import translations from './messages';
import styles from './styles.scss';

const { LOGIN } = actions;

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

    const requiredValidator = Validation.required(t('required'));

    return (
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting }) => (
          <Fragment>
            <p className={styles.errorMessage} hidden={!errorMessage}>
              {errorMessage}
            </p>
            <form
              onSubmit={handleSubmit}
              method="POST"
              encType="multipart/form-data"
              action={actionRoute(LOGIN)}
            >
              <div className={styles.inputsContainer}>
                <div className={styles.usernameField}>
                  <Field
                    name="username"
                    component={InputField}
                    type="username"
                    label={t('username')}
                    placeholder={t('inputPlaceholder')}
                    validate={composeValidators(requiredValidator)}
                  />
                </div>
                <div className={styles.passwordField}>
                  <Field
                    name="userP"
                    component={InputField}
                    type="password"
                    label={t('password')}
                    placeholder={t('inputPlaceholder')}
                    validate={requiredValidator}
                  />
                </div>
              </div>
              <div className={styles.bottomContainer}>
                <Button
                  buttonType="submit"
                  className={styles.signInButton}
                  disabled={submitting}
                  label={t('signIn')}
                  loading={submitting}
                  type="negative"
                />
              </div>
            </form>
          </Fragment>
        )}
      />
    );
  }
}

export default Translate(translations)(SignInPageContent);
