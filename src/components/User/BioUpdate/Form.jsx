import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { Mutation } from 'react-apollo';

import UPDATE_USER from 'Apollo/mutations/updateUser.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import Translate from 'Hocs/Translate';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';
import InputField from 'Components/Widgets/Form/InputField';

const { USER_UPDATE } = actions;
const { ACTION, NEGATIVE } = buttonTypes;

class BioUpdateForm extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    bio: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
  };

  static defaultProps = {
    bio: {},
  };

  constructor(props) {
    super(props);

    this.formRef = React.createRef();

    this.state = { displayError: null };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  async onSubmit(mutate, values) {
    const { closeModal, userId } = this.props;
    await mutate({ variables: { userId, input: values } });

    closeModal();

    // TODO: replace a reload with an in-place data update
    window.location.reload();
  }

  onCancel() {
    const { closeModal } = this.props;
    closeModal();
  }

  validate() {
    const { t } = this.props;
    // TODO: validate bio
    return null;
  }

  render() {
    const { bio, t } = this.props;
    const { locale } = this.context;

    return (
      <Mutation
        mutation={UPDATE_USER}
        onCompleted={() => {
          this.setState({ displayError: null });
        }}
        onError={({ ...rest }) => {
          console.error('Error', rest);
          this.setState({ displayError: t('backendError') });
        }}
      >
        {(mutate) => (
          <Form
            onSubmit={(rawInput) => {
              const input = Object.assign({}, rawInput, {
                bio: { text: rawInput.bio, locale },
              });
              return this.onSubmit(mutate, input);
            }}
            initialValues={{ bio: bio.text }}
            validate={this.validate}
            render={({ handleSubmit, submitting, submitError, errors }) => {
              const errorMessage = errors.bio || submitError || this.state.displayError;

              return (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  action={actionRoute(USER_UPDATE)}
                  method="POST"
                  ref={this.formRef}
                >
                  <p className={styles.error}>{errorMessage}</p>

                  <Field
                    className={styles.bio}
                    name="bio"
                    id="bio"
                    component={InputField}
                    type="textarea"
                    label={t('bio')}
                    placeholder={t('bioPlaceholder')}
                  />

                  <div className={styles.buttons}>
                    <Button
                      buttonType="reset"
                      type={NEGATIVE}
                      label={t('cancel')}
                      onClick={this.onCancel}
                    />
                    <Button
                      buttonType="submit"
                      label={t('update')}
                      disabled={submitting}
                      loading={submitting}
                      type={ACTION}
                    />
                  </div>
                </form>
              );
            }}
          />
        )}
      </Mutation>
    );
  }
}

export default Translate(messages)(BioUpdateForm);
