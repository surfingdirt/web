import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { useMutation } from 'react-apollo';
import { Redirect } from 'react-router';

import UPDATE_ALBUM_MUTATION from 'Apollo/mutations/updateAlbum.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import InputField from 'Components/Widgets/Form/InputField';
import Translate from 'Hocs/Translate';
import { actionRoute, albumRoute } from 'Utils/links';
import { AlbumType } from 'Utils/types';
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { ALBUM_EDIT } = actions;
const { ACTION } = buttonTypes;

const AlbumEditForm = ({ album, t }) => {
  const { locale } = useContext(AppContext);

  const [displayError, setDisplayError] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);

  const [editAlbum] = useMutation(UPDATE_ALBUM_MUTATION, {});

  const onSubmit = async ({ albumContributions, description, id, title }) => {
    // Modifying an item like this means we're going to wipe out all translations, and only
    // keep the current one. Hence locale comes from the context, not from the media item.
    const input = {
      albumContributions,
      description: { text: description.text, locale },
      title: { text: title.text, locale },
    };
    const variables = { id, input };
    try {
      await editAlbum({ variables });
      setDisplayError(null);
      setRedirectTo(albumRoute(id));
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
    albumContributions: album.albumContributions,
    id: album.id,
    title: album.title,
    description: album.description,
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
            action={actionRoute(ALBUM_EDIT)}
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

            <Field
              name="albumContributions"
              id="albumContributions"
              component={InputField}
              type="albumContributions"
              label={t('albumContributions')}
              required
            />

            {/* These hidden fields are here for JS-less only */}
            <Field name="id">{(fieldProps) => <input {...fieldProps.input} type="hidden" />}</Field>
            <Field name="title[locale]">
              {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
            </Field>
            <Field name="description[locale]">
              {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
            </Field>

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

AlbumEditForm.propTypes = {
  album: AlbumType.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(AlbumEditForm);
