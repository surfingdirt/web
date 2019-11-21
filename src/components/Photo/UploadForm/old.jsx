import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router';

import CREATE_PHOTO_MUTATION from 'Apollo/mutations/createPhoto2.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import InputField from 'Components/Widgets/Form/InputField';
import Translate from 'Hocs/Translate';
import { previewResizeAndOrientFile } from 'Utils/imageProcessing';
import icons, { getIcon, sizes } from 'Utils/icons';
import { actionRoute, photoRoute } from 'Utils/links';
import { maxPhotoSize, MEDIA_SUBTYPE_IMG } from 'Utils/media';
import actions from '~/actions';

import messages from './messages';
import styles from './styles.scss';

const { PHOTO_NEW } = actions;
const { ACTION } = buttonTypes;
const { STANDARD } = sizes;

const MAX_WIDTH = maxPhotoSize;
const MAX_HEIGHT = maxPhotoSize;

class PhotoUploadForm extends React.Component {
  static propTypes = {
    albumId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      fileData: null,
      previewUrl: null,
      displayError: null,
      uploadWidth: null,
      uploadHeight: null,
      redirectTo: null,
    };

    this.formRef = React.createRef();
    this.dynamicContentRef = React.createRef();
    this.fileRef = React.createRef();
    this.previewRef = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  async onSubmit(mutate, values) {
    const { fileData } = this.state;

    const { file: unused, ...input } = values;
    const response = await mutate({ variables: { file: fileData, input } });
    const { id } = response.data.createPhoto;

    this.setState({
      redirectTo: photoRoute(id),
    });
  }

  async validate(values) {
    const { t } = this.props;

    const fileEl = this.fileRef.current;
    if (!fileEl) {
      return Promise.resolve();
    }

    const errors = {};
    if (!values.title) {
      errors.title = t('required');
    }

    return new Promise(async (resolve) => {
      if (fileEl.files.length === 0) {
        return resolve(errors);
      }

      try {
        const { blob: fileData, width, height } = await previewResizeAndOrientFile(
          fileEl.files[0],
          this.previewRef.current,
          MAX_WIDTH,
          MAX_HEIGHT,
        );

        this.setState({
          fileData,
          previewUrl: URL.createObjectURL(fileData),
          displayError: null,
          uploadWidth: width,
          uploadHeight: height,
        });
        return resolve(errors);
      } catch (e) {
        console.error('Error while manipulating image file:', e.message);
        errors.file = t('invalidImage');
        return resolve(errors);
      }
    });
  }

  render() {
    const { albumId, t } = this.props;
    const { previewUrl, redirectTo } = this.state;

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <Mutation
        mutation={CREATE_PHOTO_MUTATION}
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
            initialValues={{ albumId, mediaSubType: MEDIA_SUBTYPE_IMG }}
            onSubmit={(values) => {
              return this.onSubmit(mutate, values);
            }}
            validate={this.validate}
            render={({ handleSubmit, invalid, submitting, submitError, errors }) => {
              const empty = !this.state.fileData;
              const errorMessage = errors.file || submitError || this.state.displayError;

              let previewWidth = 0;
              let previewHeight = 0;
              if (this.dynamicContentRef.current) {
                previewWidth = this.dynamicContentRef.current.offsetWidth;
                previewHeight = (this.state.uploadHeight * previewWidth) / this.state.uploadWidth;
              }
              const previewStyle = { width: `${previewWidth}px`, height: `${previewHeight}px` };

              return (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  action={actionRoute(PHOTO_NEW)}
                  method="POST"
                  encType="multipart/form-data"
                  ref={this.formRef}
                >
                  <canvas ref={this.previewRef} className={styles.workCanvas} />
                  <label htmlFor="fileInput" className={styles.fileLabel}>
                    <div
                      className={classnames(styles.dynamicContent, { [styles.empty]: empty })}
                      ref={this.dynamicContentRef}
                    >
                      {errorMessage && (
                        <p
                          className={classnames(styles.error, {
                            [styles.visibleError]: !!errorMessage,
                          })}
                        >
                          {errorMessage}
                        </p>
                      )}
                      <span className={styles.instructions}>
                        {getIcon({ type: icons.PHOTO, size: STANDARD })}
                        <p>{t('instructions')}</p>
                      </span>
                      <img
                        src={previewUrl}
                        alt=""
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

                  <Field
                    name="title"
                    id="title"
                    component={InputField}
                    type="text"
                    label={t('title')}
                    placeholder={t('titlePlaceholder')}
                  />
                  <Field
                    className={styles.description}
                    name="description"
                    id="description"
                    component={InputField}
                    type="textarea"
                    label={t('description')}
                    placeholder={t('descriptionPlaceholder')}
                    required={false}
                  />

                  <Field name="albumId">
                    {(props) => <input {...props.input} type="hidden" />}
                  </Field>
                  <Field name="mediaSubType">
                    {(props) => <input {...props.input} type="hidden" />}
                  </Field>

                  <div className={styles.buttons}>
                    <Button
                      buttonType="submit"
                      label={t('upload')}
                      disabled={submitting || invalid}
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

export default Translate(messages)(PhotoUploadForm);
