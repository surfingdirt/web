import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { Mutation } from 'react-apollo';

import UPDATE_COVER from 'Apollo/mutations/updateCover2.gql';
import Button, { buttonTypes } from 'Components/Button';
import Translate from 'Hocs/Translate';
import { previewResizeAndOrientFile } from 'Utils/imageProcessing';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from '../messages';
import styles from '../modal.scss';

const { COVER_UPDATE } = actions;
const { NEGATIVE } = buttonTypes;

const PREVIEW_SIZE = 180;

// TODO: take this in from the context
const MAX_TARGET_SIZE = 1280;
const MAX_WIDTH = MAX_TARGET_SIZE;
const MAX_HEIGHT = MAX_TARGET_SIZE;

class CoverUpdateForm extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { fileData: null, displayError: null, uploadWidth: null, uploadHeight: null };

    this.formRef = React.createRef();
    this.fileRef = React.createRef();
    this.previewRef = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  async onSubmit(mutate) {
    const { fileData } = this.state;
    const { closeModal, t } = this.props;
    const { files } = this.fileRef.current;
    if (!fileData) {
      this.setState({ displayError: t('pleasePickAFile') });
      return;
    }

    const response = await mutate({ variables: { file: fileData } });
    const { cover } = response.data.updateCover;
    this.context.updateCover(cover);

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
        const { blob: fileData, width, height } = await previewResizeAndOrientFile(
          fileEl.files[0],
          this.previewRef.current,
          MAX_WIDTH,
          MAX_HEIGHT,
        );
        this.setState({ fileData, displayError: null, uploadWidth: width, uploadHeight: height });
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
        mutation={UPDATE_COVER}
        onCompleted={() => {
          this.setState({ displayError: null });
        }}
        onError={({ ...rest }) => {
          console.log('Error', rest);
          this.setState({ displayError: t('backendError') });
        }}
      >
        {(mutate) => (
          <Form
            onSubmit={(values) => {
              return this.onSubmit(mutate, values);
            }}
            validate={this.validate}
            render={({ handleSubmit, submitting, submitError, errors }) => {
              const empty = !this.state.fileData;
              const errorMessage = errors.file || submitError || this.state.displayError;
              const hasError = !!errorMessage;

              const previewWidth = PREVIEW_SIZE;
              const previewHeight =
                (this.state.uploadHeight * PREVIEW_SIZE) / this.state.uploadWidth;
              const previewStyle = { width: `${previewWidth}px`, height: `${previewHeight}px` };

              return (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  action={actionRoute(COVER_UPDATE)}
                  method="POST"
                  encType="multipart/form-data"
                  ref={this.formRef}
                >
                  <label htmlFor="fileInput" className={styles.fileLabel}>
                    {t('cover1')}
                  </label>
                  <label htmlFor="fileInput" className={styles.fileLabel}>
                    <div className={classnames(styles.dynamicContent, { [styles.empty]: empty })}>
                      <div
                        className={classnames(styles.error, { [styles.visibleError]: hasError })}
                      >
                        {errorMessage}
                      </div>
                      <span className={styles.instructions}>{t('instructions')}</span>
                      <canvas
                        ref={this.previewRef}
                        className={styles.preview}
                        style={previewStyle}
                      />
                    </div>
                    <div className={styles.fileInput}>
                      <Field name="file">
                        {({ input: { onChange } }) => {
                          return (
                            <input
                              type="file"
                              id="fileInput"
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

export default Translate(messages)(CoverUpdateForm);
