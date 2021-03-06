import React, { useContext, useRef, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { useMutation } from 'react-apollo';
import { Redirect } from 'react-router';

import CREATE_PHOTO_MUTATION from 'Apollo/mutations/createPhoto.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import InputField from 'Components/Widgets/Form/InputField';
import Translate from 'Hocs/Translate';
import { previewResizeAndOrientFile } from 'Utils/imageProcessing';
import icons, { getIcon } from 'Utils/icons';
import sizes from 'Utils/iconSizes';
import { actionRoute, photoRoute } from 'Utils/links';
import {
  maxPhotoSize,
  updateHomeQueryAfterMediaUpload,
  updateAlbumQueryAfterMediaUpload,
  MEDIA_SUBTYPE_IMG,
} from 'Utils/media';
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { PHOTO_NEW } = actions;
const { ACTION } = buttonTypes;
const { STANDARD } = sizes;

const MAX_WIDTH = maxPhotoSize;
const MAX_HEIGHT = maxPhotoSize;

const PhotoUploadForm = ({ albumId, t }) => {
  const { galleryAlbumId, locale } = useContext(AppContext);

  const formRef = useRef();
  const dynamicContentRef = useRef();
  const fileRef = useRef();
  const previewRef = useRef();

  const [fileData, setFileData] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [displayError, setDisplayError] = useState(null);
  const [uploadWidth, setUploadWidth] = useState(null);
  const [uploadHeight, setUploadHeight] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);

  const [addPhoto] = useMutation(CREATE_PHOTO_MUTATION, {});

  const onSubmit = async (values) => {
    const { file: unused, ...rawInput } = values;
    const input = Object.assign({}, rawInput, {
      description: { text: rawInput.description, locale },
      title: { text: rawInput.title, locale },
    });
    try {
      const response = await addPhoto({
        update: (cache, resultObj) => {
          const newItem = Object.values(resultObj.data)[0];

          updateHomeQueryAfterMediaUpload(cache, newItem, albumId, galleryAlbumId);

          updateAlbumQueryAfterMediaUpload(cache, newItem, albumId);
        },
        variables: { file: fileData, input },
      });
      setDisplayError(null);
      const { id } = response.data.createPhoto;
      setRedirectTo(photoRoute(id));
    } catch (e) {
      setDisplayError(t('backendError'));
    }
  };

  const prepareImage = async () => {
    const fileEl = fileRef.current;
    if (!fileEl) {
      console.log('No file element');
      return;
    }

    if (fileEl.files.length === 0) {
      console.log('No file chosen');
      return;
    }

    try {
      const { blob, width, height } = await previewResizeAndOrientFile(
        fileEl.files[0],
        previewRef.current,
        MAX_WIDTH,
        MAX_HEIGHT,
      );
      setFileData(blob);
      setPreviewUrl(URL.createObjectURL(blob));
      setUploadWidth(width);
      setUploadHeight(height);
      setImageError(false);
    } catch (e) {
      setFileData(null);
      setPreviewUrl(null);
      setUploadWidth(null);
      setUploadHeight(null);
      setImageError(true);
      console.error('Error while manipulating image file:', e.message);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = t('required');
    }

    if (imageError) {
      errors.file = t('invalidImage');
    }

    return errors;
  };

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <Form
      initialValues={{ albumId, mediaSubType: MEDIA_SUBTYPE_IMG }}
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, invalid, submitting, submitError, errors }) => {
        const empty = !fileData;
        const errorMessage = errors.file || submitError || displayError;

        let previewWidth = 0;
        let previewHeight = 0;
        if (dynamicContentRef.current) {
          previewWidth = dynamicContentRef.current.offsetWidth;
          previewHeight = (uploadHeight * previewWidth) / uploadWidth;
        }
        const previewStyle = { width: `${previewWidth}px`, height: `${previewHeight}px` };

        return (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            action={actionRoute(PHOTO_NEW)}
            method="POST"
            encType="multipart/form-data"
            ref={formRef}
          >
            <canvas ref={previewRef} className={styles.workCanvas} />
            <label htmlFor="fileInput" className={styles.fileLabel}>
              <div
                className={classnames(styles.dynamicContent, { [styles.empty]: empty })}
                ref={dynamicContentRef}
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
                <img src={previewUrl} alt="" className={styles.preview} style={previewStyle} />
              </div>
              <div className={styles.fileInput}>
                <Field name="file">
                  {({ input: { onChange } }) => (
                    <input
                      type="file"
                      id="fileInput"
                      name="file"
                      ref={fileRef}
                      onChange={async (e) => {
                        await prepareImage();
                        onChange(e);
                      }}
                    />
                  )}
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
              {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
            </Field>
            <Field name="mediaSubType">
              {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
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
  );
};

PhotoUploadForm.propTypes = {
  albumId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(PhotoUploadForm);
