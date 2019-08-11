import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

import Button, { buttonTypes } from 'Components/Button';
import Translate from 'Hocs/Translate';
import { previewResizeAndOrientFile } from 'Utils/imageProcessing';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';

import messages from './messages';
import styles from './styles.scss';

const { AVATAR_UPDATE } = actions;
const { NEGATIVE } = buttonTypes;

const MAX_TARGET_SIZE = 640;
const MAX_WIDTH = MAX_TARGET_SIZE;
const MAX_HEIGHT = MAX_TARGET_SIZE;

class AvatarUpdateForm extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { fileData: null };

    this.fileRef = React.createRef();
    this.previewRef = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  async onSubmit(values) {
    console.log('onSubmit', values, this.state.fileData);
  }

  async validate() {
    const { t } = this.props;

    const fileEl = this.fileRef.current;
    if (!fileEl) {
      console.log('fileEl not set');
      return Promise.resolve();
    }

    console.log({ fileEl });
    return new Promise(async (resolve) => {
      if (fileEl.files.length === 0) {
        console.log('No files chosen');
        return resolve();
      }

      try {
        const fileData = await previewResizeAndOrientFile(
          fileEl.files[0],
          this.previewRef.current,
          MAX_WIDTH,
          MAX_HEIGHT,
        );
        this.setState({ fileData });
        console.log('File is ok');
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
      <Form
        onSubmit={this.onSubmit}
        validate={this.validate}
        render={({ handleSubmit, submitting, submitError, errors }) => {
          const empty = !this.state.fileData;
          const hasError = !!errors.file;

          console.log({ submitError, errors });
          return (
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              action={actionRoute(AVATAR_UPDATE)}
              method="POST"
              encType="multipart/form-data"
            >
              <label htmlFor="avatar" className={styles.fileLabel}>
                {t('avatar1')}
              </label>
              <label htmlFor="avatar" className={styles.fileLabel}>
                {t('avatar2')}
              </label>
              <label htmlFor="avatar" className={styles.fileLabel}>
                <div className={classnames(styles.dynamicContent, { [styles.empty]: empty })}>
                  <div className={classnames(styles.error, { [styles.visibleError]: hasError })}>
                    {errors.file}
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
                  label={t('send')}
                  disabled={submitting}
                  loading={submitting}
                />
                <Button buttonType="reset" type={NEGATIVE} label={t('cancel')} />
              </div>
            </form>
          );
        }}
      />
    );
  }
}

export default Translate(messages)(AvatarUpdateForm);
