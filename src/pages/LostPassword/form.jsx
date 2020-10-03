import React, { Fragment, PureComponent } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';

import Button, { buttonTypes } from 'Components/Widgets/Button/index';
import InputField from 'Components/Widgets/Form/InputField';
import Translate from 'Hocs/Translate';
import Validation from 'Utils/validators';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';

import messages from './messages';
import styles from './styles.scss';
import Paragraph from 'Components/Widgets/Paragraph';

const { FORGOT_PASSWORD } = actions;
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
            <Paragraph>{t('explanations')}</Paragraph>
            <p className={styles.errorMessage} hidden={!errorMessage}>
              {errorMessage}
            </p>
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              method="POST"
              encType="multipart/form-data"
              action={actionRoute(FORGOT_PASSWORD)}
            >
              <div className={styles.inputsContainer}>
                <div className={styles.usernameField}>
                  <Field
                    autoComplete="username"
                    component={InputField}
                    id="username"
                    label={t('username')}
                    name="username"
                    placeholder={t('inputPlaceholder')}
                    type="username"
                    validate={requiredValidator}
                  />
                </div>
              </div>
              <div className={styles.bottomContainer}>
                <Button
                  type={ACTION}
                  buttonType="submit"
                  className={styles.submitButton}
                  label={t('send')}
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
