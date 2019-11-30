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
import { buildEmbedUrl, extractKeyAndSubType } from 'Utils/video';
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { VIDEO_NEW } = actions;
const { ACTION } = buttonTypes;
const { STANDARD } = sizes;

const VIDEO_PREVIEW_WIDTH = 16;
const VIDEO_PREVIEW_HEIGHT = 9;

const VideoUploadForm = ({ albumId, t }) => {
  const { galleryAlbumId } = useContext(AppContext);
  const [displayError, setDisplayError] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);

  const [addVideo] = useMutation(CREATE_VIDEO_MUTATION, {});
  const [getVideoInfo, { data, loading }] = useLazyQuery(GET_VIDEO_INFO);

  console.log('videoInfo', { data, loading });

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
    } else {
      const { mediaSubType, vendorKey } = extractKeyAndSubType(values.url);
      if (!mediaSubType || !vendorKey) {
        errors.url = t('notUnderstood');
      }
    }

    return errors;
  };

  const renderPreview = (iframeUrl) => {
    if (!iframeUrl) {
      return null;
    }

    return <VideoEmbed url={iframeUrl} height={VIDEO_PREVIEW_HEIGHT} width={VIDEO_PREVIEW_WIDTH} />;
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
  }

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, invalid, submitting, submitError, values }) => {
        const errorMessage = submitError || displayError;

        // TODO: replace this with a spinner if loading is true. Also disable the form.
        const preview = renderPreview(iframeUrl);

        return (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            action={actionRoute(VIDEO_NEW)}
            method="POST"
            encType="multipart/form-data"
          >
            <div className={classnames(styles.preview, { [styles.empty]: !preview })}>
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
              onChange={(e) => {
                console.log('url onChange', e);
                getVideoInfo({ variables: { url: e.target.value } });
              }}
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
