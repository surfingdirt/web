import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router';

import CREATE_VIDEO_MUTATION from 'Apollo/mutations/createVideo.gql';
import GET_VIDEO_INFO from 'Apollo/queries/getVideoInfo.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import InputField from 'Components/Widgets/Form/InputField';
import Spinner from 'Components/Widgets/Spinner';
import Translate from 'Hocs/Translate';
import { actionRoute, videoRoute } from 'Utils/links';
import { updateHomeQueryAfterMediaUpload, updateAlbumQueryAfterMediaUpload } from 'Utils/media';
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { VIDEO_NEW } = actions;
const { ACTION } = buttonTypes;

const Step2 = ({ albumId, t, url }) => {
  const { galleryAlbumId, locale } = useContext(AppContext);
  const [displayError, setDisplayError] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);

  const [addVideo] = useMutation(CREATE_VIDEO_MUTATION, {});
  const { data, error: videoInfoErrorFlag, loading } = useQuery(GET_VIDEO_INFO, {
    variables: { url },
  });
  const videoInfoError = videoInfoErrorFlag ? t('videoInfoError') : null;

  if (loading) {
    return <Spinner negative />;
  }

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  const initialValues = { albumId, url };
  if (data) {
    ['description', 'height', 'mediaSubType', 'thumbUrl', 'title', 'vendorKey', 'width'].forEach(
      (key) => {
        initialValues[key] = data.getVideoInfo[key];
      },
    );
  }

  const onSubmit = async ({ url: _, mediaSubType, ...rawInput }) => {
    const input = Object.assign({}, rawInput, {
      description: { text: rawInput.description, locale },
      mediaSubType: mediaSubType.toUpperCase(),
      title: { text: rawInput.title, locale },
    });
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

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, invalid, submitting, submitError }) => {
        const errorMessage = submitError || displayError || videoInfoError;

        return (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            action={actionRoute(VIDEO_NEW)}
            method="POST"
            encType="multipart/form-data"
          >
            <p className={classnames(styles.error, { [styles.visibleError]: !!errorMessage })}>
              {errorMessage}
            </p>

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
            <Field name="height">
              {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
            </Field>
            <Field name="mediaSubType">
              {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
            </Field>
            <Field name="thumbUrl">
              {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
            </Field>
            <Field name="url">
              {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
            </Field>
            <Field name="vendorKey">
              {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
            </Field>
            <Field name="width">
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

Step2.propTypes = {
  albumId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default Translate(messages)(Step2);
