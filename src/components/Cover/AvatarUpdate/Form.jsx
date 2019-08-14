import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { Mutation } from 'react-apollo';

import UPDATE_AVATAR from 'Apollo/mutations/updateAvatar.gql';
import Button, { buttonTypes } from 'Components/Button';
import Translate from 'Hocs/Translate';
import { previewResizeAndOrientFile } from 'Utils/imageProcessing';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { AVATAR_UPDATE } = actions;
const { NEGATIVE } = buttonTypes;

const MAX_TARGET_SIZE = 640;
const MAX_WIDTH = MAX_TARGET_SIZE;
const MAX_HEIGHT = MAX_TARGET_SIZE;

class AvatarUpdateForm extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { fileData: null, displayError: null, submitted: false };

    this.formRef = React.createRef();
    this.fileRef = React.createRef();
    this.previewRef = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  async onSubmit(mutate) {
    const { closeModal, t } = this.props;
    const { files } = this.fileRef.current;
    if (files.length === 0) {
      this.setState({ displayError: t('pleasePickAFile') });
      return;
    }

    const response = await mutate({ variables: { file: files[0] } });
    const { avatar } = response.data.updateAvatar;
    this.context.updateAvatar(avatar);

    closeModal();

    // TODO: replace a reload with an in-place data update
    window.location.reload();
  }

  onCancel() {
    const { closeModal } = this.props;

    closeModal();
  }

  async validate() {
    const { t } = this.props;

    const fileEl = this.fileRef.current;
    if (!fileEl) {
      return Promise.resolve();
    }

    return new Promise(async (resolve) => {
      if (fileEl.files.length === 0) {
        return resolve();
      }

      try {
        const fileData = await previewResizeAndOrientFile(
          fileEl.files[0],
          this.previewRef.current,
          MAX_WIDTH,
          MAX_HEIGHT,
        );
        this.setState({ fileData, displayError: null });
        return resolve();
      } catch (e) {
        console.error('Error while manipulating image file:', e.message);
        return resolve({ file: t('invalidImage') });
      }
    });
  }

  render() {
    const { t } = this.props;

    return (
      <Mutation
        mutation={UPDATE_AVATAR}
        onCompleted={() => {
          this.setState({ displayError: null });
        }}
        onError={({ ...rest }) => {
          console.log('Error', rest);
          this.setState({ displayError: t('backendError') });
        }}
      >
        {(updateAvatar) => (
          <Form
            onSubmit={(values) => {
              return this.onSubmit(updateAvatar, values);
            }}
            validate={this.validate}
            render={({ handleSubmit, submitting, submitError, errors }) => {
              const empty = !this.state.fileData;
              const errorMessage = errors.file || submitError || this.state.displayError;
              const hasError = !!errorMessage;
              return (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  action={actionRoute(AVATAR_UPDATE)}
                  method="POST"
                  encType="multipart/form-data"
                  ref={this.formRef}
                >
                  <label htmlFor="avatar" className={styles.fileLabel}>
                    {t('avatar1')}
                  </label>
                  <label htmlFor="avatar" className={styles.fileLabel}>
                    {t('avatar2')}
                  </label>
                  <label htmlFor="avatar" className={styles.fileLabel}>
                    <div className={classnames(styles.dynamicContent, { [styles.empty]: empty })}>
                      <div
                        className={classnames(styles.error, { [styles.visibleError]: hasError })}
                      >
                        {errorMessage}
                      </div>
                      <span className={styles.instructions}>{t('instructions')}</span>
                      <canvas ref={this.previewRef} className={styles.preview} />
                    </div>
                    <div className={styles.fileInput}>
                      <Field name="file">
                        {({ input: { onChange } }) => {
                          return (
                            <input
                              type="file"
                              id="avatar"
                              name="file"
                              ref={this.fileRef}
                              onChange={onChange}
                            />
                          );
                        }}
                      </Field>
                    </div>
                  </label>

                  <div className={styles.buttons}>
                    <Button
                      buttonType="submit"
                      label={t('upload')}
                      disabled={submitting}
                      loading={submitting}
                    />
                    <Button
                      buttonType="reset"
                      type={NEGATIVE}
                      label={t('cancel')}
                      onClick={this.onCancel}
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

export default Translate(messages)(AvatarUpdateForm);
