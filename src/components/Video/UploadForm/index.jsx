import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router';

import CREATE_VIDEO_MUTATION from 'Apollo/mutations/createVideo.gql';
import GET_VIDEO_INFO from 'Apollo/queries/getVideoInfo.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import InputField from 'Components/Widgets/Form/InputField';
import VideoEmbed from 'Components/Video/Embed';
import Translate from 'Hocs/Translate';
import icons, { getIcon, sizes } from 'Utils/icons';
import { actionRoute, videoRoute } from 'Utils/links';
import { updateHomeQueryAfterMediaUpload, updateAlbumQueryAfterMediaUpload } from 'Utils/media';
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { VIDEO_NEW } = actions;
const { ACTION } = buttonTypes;
const { STANDARD } = sizes;

const VIDEO_PREVIEW_WIDTH = 16;
const VIDEO_PREVIEW_HEIGHT = 9;

const DEBOUNCE_DURATION_MS = 500;
const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

let timeout = null;

const isValidUrl = (url) => {
  const matches = url.match(URL_REGEX);
  const isValid = matches && matches.length > 0;
  return isValid;
};

const VideoUploadForm = ({ albumId, t }) => {
  const { galleryAlbumId } = useContext(AppContext);
  const [displayError, setDisplayError] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  // videoUrl is the manually entered url
  const [videoUrl, setVideoUrl] = useState('');

  const [addVideo] = useMutation(CREATE_VIDEO_MUTATION, {});
  const [getVideoInfo, { data, error: videoInfoErrorFlag, loading }] = useLazyQuery(GET_VIDEO_INFO);
  const videoInfoError = videoInfoErrorFlag ? t('videoInfoError') : null;

  const onUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);

    if (!isValidUrl(url)) {
      return;
    }

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      getVideoInfo({ variables: { url } });
    }, DEBOUNCE_DURATION_MS);
  };

  const onSubmit = async ({ url, mediaSubType, ...rest }) => {
    const input = Object.assign({}, rest, { mediaSubType: mediaSubType.toUpperCase() });
    try {
      const response = await addVideo({
        update: (cache, resultObj) => {
          const newItem = Object.values(resultObj.data)[0];

          updateHomeQueryAfterMediaUpload(cache, newItem, albumId, galleryAlbumId);

          updateAlbumQueryAfterMediaUpload(cache, newItem, albumId);
        },
        variables: { input },
      });
      setDisplayError(null);
      const { id } = response.data.createVideo;
      setRedirectTo(videoRoute(id));
    } catch (e) {
      setDisplayError(t('backendError'));
    }
  };

  const validate = async (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = t('required');
    }

    if (!values.url) {
      errors.url = t('required');
    }

    return errors;
  };

  const renderPreview = (iframeUrl, isLoading) => {
    if (!iframeUrl && !isLoading) {
      return null;
    }

    return (
      <VideoEmbed
        loading={loading}
        url={iframeUrl}
        height={VIDEO_PREVIEW_HEIGHT}
        width={VIDEO_PREVIEW_WIDTH}
      />
    );
  };

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  let initialValues = { albumId };
  let iframeUrl = null;
  if (data) {
    const {
      description,
      height,
      mediaSubType,
      thumbUrl,
      title,
      url,
      vendorKey,
      width,
    } = data.getVideoInfo;
    // eslint-disable-next-line prefer-destructuring
    iframeUrl = data.getVideoInfo.iframeUrl;
    initialValues = Object.assign({}, initialValues, {
      description,
      height,
      mediaSubType,
      thumbUrl,
      title,
      url,
      vendorKey,
      width,
    });
  } else {
    initialValues.url = videoUrl;
  }

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, invalid, submitting, submitError, values }) => {
        const errorMessage = submitError || displayError || videoInfoError;
        const preview = renderPreview(iframeUrl, loading);

        const empty = !preview || loading;

        return (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            action={actionRoute(VIDEO_NEW)}
            method="POST"
            encType="multipart/form-data"
          >
            <div className={classnames(styles.preview, { [styles.empty]: empty })}>
              {preview || (
                <div className={styles.content}>
                  {getIcon({ type: icons.VIDEO, size: STANDARD })}
                  <p>{t('pasteBelow')}</p>
                </div>
              )}
            </div>

            <p className={classnames(styles.error, { [styles.visibleError]: !!errorMessage })}>
              {errorMessage}
            </p>
            <Field
              name="url"
              id="url"
              component={InputField}
              type="text"
              label={t('url')}
              placeholder={t('urlPlaceholder')}
              onChange={onUrlChange}
            />

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
            <Field name="thumbUrl">
              {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
            </Field>
            <Field name="width">
              {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
            </Field>
            <Field name="height">
              {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
            </Field>
            <Field name="mediaSubType">
              {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
            </Field>
            <Field name="vendorKey">
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

VideoUploadForm.propTypes = {
  albumId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(VideoUploadForm);
