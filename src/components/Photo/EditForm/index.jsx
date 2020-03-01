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
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { PHOTO_EDIT } = actions;
const { ACTION } = buttonTypes;

const PhotoEditForm = ({ media, t }) => {
  const { locale } = useContext(AppContext);

  const [displayError, setDisplayError] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);

  const [editPhoto] = useMutation(UPDATE_PHOTO_MUTATION, {});

  const onSubmit = async ({ description, id, title }) => {
    // Modifying an item like this means we're going to wipe out all translations, and only
    // keep the current one. Hence locale comes from the context, not from the media item.
    const input = {
      description: { text: description.text, locale },
      title: { text: title.text, locale },
    };
    const variables = { id, input };
    try {
      await editPhoto({ variables });
      setDisplayError(null);
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
