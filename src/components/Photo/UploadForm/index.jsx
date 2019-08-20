import React, { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router';

import CREATE_PHOTO_MUTATION from 'Apollo/mutations/createPhoto3.gql';
import Button, { buttonTypes } from 'Components/Button';
import Translate from 'Hocs/Translate';
import { previewResizeAndOrientFile } from 'Utils/imageProcessing';
import Validation from 'Utils/fieldLevelValidation';
import { actionRoute, photoRoute } from 'Utils/links';
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';
import InputField from 'Components/Form/InputField';

const { PHOTO_NEW } = actions;
const { ACTION } = buttonTypes;

const PREVIEW_SIZE = 50;
const mediaSubType = 'IMG';

// TODO: take this in from the context
const MAX_TARGET_SIZE = 1920;
const MAX_WIDTH = MAX_TARGET_SIZE;
const MAX_HEIGHT = MAX_TARGET_SIZE;

class PhotoUploadForm extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    albumId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      fileData: null,
      displayError: null,
      uploadWidth: null,
      uploadHeight: null,
      redirectTo: null,
    };

    this.formRef = React.createRef();
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

        this.setState({ fileData, displayError: null, uploadWidth: width, uploadHeight: height });
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
    const { redirectTo } = this.state;

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    const requiredValidator = Validation.required(t('required'));

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
            initialValues={{ albumId, mediaSubType }}
            onSubmit={(values) => {
              return this.onSubmit(mutate, values);
            }}
            validate={this.validate}
            render={({ handleSubmit, invalid, submitting, submitError, errors }) => {
              const empty = !this.state.fileData;
              const errorMessage = errors.file || submitError || this.state.displayError;
              const hasError = !!errorMessage;

              const previewWidth = PREVIEW_SIZE;
              const previewHeight =
                (this.state.uploadHeight * PREVIEW_SIZE) / this.state.uploadWidth;
              const previewStyle = { width: `${previewWidth}vw`, height: `${previewHeight}vw` };

              return (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  action={actionRoute(PHOTO_NEW)}
                  method="POST"
                  encType="multipart/form-data"
                  ref={this.formRef}
                >
                  <label htmlFor="fileInput" className={styles.fileLabel}>
                    <div className={classnames(styles.dynamicContent, { [styles.empty]: empty })}>
                      <div
                        className={classnames(styles.error, { [styles.visibleError]: hasError })}
                      >
                        {errorMessage}
                      </div>
                      <span className={styles.instructions}>{t('instructions2')}</span>
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

                  <Field
                    name="title"
                    id="title"
                    component={InputField}
                    type="text"
                    label={t('title')}
                    placeholder={t('titlePlaceHolder')}
                    validate={requiredValidator}
                  />
                  <Field
                    className={styles.description}
                    name="description"
                    id="description"
                    component={InputField}
                    type="textarea"
                    label={t('description')}
                    placeholder={t('descriptionPlaceHolder')}
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
