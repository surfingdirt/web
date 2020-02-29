import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { useMutation } from 'react-apollo';
import { Redirect } from 'react-router';

import UPDATE_PHOTO_MUTATION from 'Apollo/mutations/updatePhoto2.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import InputField from 'Components/Widgets/Form/InputField';
import Translate from 'Hocs/Translate';
import { actionRoute, photoRoute } from 'Utils/links';
import { MediaType } from 'Utils/types';
import { updateHomeQueryAfterMediaUpload, updateAlbumQueryAfterMediaUpload } from 'Utils/media';
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { PHOTO_EDIT } = actions;
const { ACTION } = buttonTypes;

const PhotoEditForm = ({ media, t }) => {
  const {
    album: { id: albumId },
  } = media;
  const { galleryAlbumId, locale } = useContext(AppContext);

  const [displayError, setDisplayError] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);

  const [editPhoto] = useMutation(UPDATE_PHOTO_MUTATION, {});

  const onSubmit = async (rawInput) => {
    const input = {
      id: rawInput.id,
      description: { text: rawInput.description, locale },
      title: { text: rawInput.title, locale },
    };
    try {
      const response = await editPhoto({
        update: (cache, resultObj) => {
          const newItem = Object.values(resultObj.data)[0];

          updateHomeQueryAfterMediaUpload(cache, newItem, albumId, galleryAlbumId);

          updateAlbumQueryAfterMediaUpload(cache, newItem, albumId);
        },
        variables: { input },
      });
      setDisplayError(null);
      const { id } = response.data.createPhoto;
      setRedirectTo(photoRoute(id));
    } catch (e) {
      setDisplayError(t('backendError'));
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = t('required');
    }

    return errors;
  };

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  const initialValues = {
    id: media.id,
    title: media.title,
    description: media.description,
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, invalid, submitting, submitError }) => {
        const errorMessage = submitError || displayError;
        return (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            action={actionRoute(PHOTO_EDIT)}
            method="POST"
            encType="multipart/form-data"
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
            <Field
              name="title[text]"
              id="title"
              component={InputField}
              type="text"
              label={t('title')}
              placeholder={t('titlePlaceholder')}
            />
            <Field name="title[locale]">
              {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
            </Field>

            <Field
              className={styles.description}
              name="description[text]"
              id="description"
              component={InputField}
              type="textarea"
              label={t('description')}
              placeholder={t('descriptionPlaceholder')}
              required={false}
            />
            <Field name="description[locale]">
              {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
            </Field>

            <Field name="id">{(fieldProps) => <input {...fieldProps.input} type="hidden" />}</Field>
            <div className={styles.buttons}>
              <Button
                buttonType="submit"
                label={t('edit')}
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

PhotoEditForm.propTypes = {
  media: MediaType.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(PhotoEditForm);
