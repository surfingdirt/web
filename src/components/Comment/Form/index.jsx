import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form, Field } from 'react-final-form';
import { useMutation } from '@apollo/react-hooks';

import CREATE_COMMENT_ALBUM from 'Apollo/mutations/createCommentAlbum2.gql';
import CREATE_COMMENT_PHOTO from 'Apollo/mutations/createCommentPhoto2.gql';
import CREATE_COMMENT_VIDEO from 'Apollo/mutations/createCommentVideo2.gql';
import LIST_COMMENTS from 'Apollo/queries/listComments3.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import InputField from 'Components/Widgets/Form/InputField';
import SelectField from 'Components/Widgets/Form/SelectField';
import Translate from 'Hocs/Translate';
import { tones } from 'Utils/comments';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';

import messages from './messages';
import styles from './styles.scss';

const { COMMENT_NEW_ALBUM, COMMENT_NEW_PHOTO, COMMENT_NEW_VIDEO } = actions;
const { ACTION } = buttonTypes;

const ALBUM = 'album';
const PHOTO = 'photo';
const VIDEO = 'video';

export const commentTypes = { ALBUM, PHOTO, VIDEO };

const MUTATIONS = {
  [ALBUM]: CREATE_COMMENT_ALBUM,
  [PHOTO]: CREATE_COMMENT_PHOTO,
  [VIDEO]: CREATE_COMMENT_VIDEO,
};

const ACTIONS = {
  [ALBUM]: COMMENT_NEW_ALBUM,
  [PHOTO]: COMMENT_NEW_PHOTO,
  [VIDEO]: COMMENT_NEW_VIDEO,
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const CommentForm = ({ className, id: parentId, t, type }) => {
  const action = ACTIONS[type];
  const mutation = MUTATIONS[type];

  const [addComment] = useMutation(mutation, {
    update: (cache, resultObj) => {
      const newItem = Object.values(resultObj.data)[0];

      const { listComments } = cache.readQuery({
        query: LIST_COMMENTS,
        variables: {
          parentId,
          parentType: type,
        },
      });
      cache.writeQuery({
        query: LIST_COMMENTS,
        variables: {
          parentId,
          parentType: type,
        },
        data: { listComments: listComments.concat([newItem]) },
      });
    },
  });

  const validate = ({ content, tone }) => {
    const errors = {};

    if (!content) {
      errors.content = t('required');
    }

    if (tone && !Object.values(tones).includes(tone)) {
      errors.tone = t('invalid');
    }

    return errors;
  };

  const onSubmit = async (values) => {
    let errors;
    try {
      await addComment({
        variables: { input: values },
      });
    } catch (e) {
      errors = { content: 'some error' };
    }
    return errors;
  };

  return (
    <Form
      initialValues={{ parentId }}
      onSubmit={onSubmit}
      validate={validate}
      render={(formProps) => {
        const { form, handleSubmit, invalid, submitting } = formProps;

        return (
          <div className={classnames(styles.wrapper, className)}>
            <form
              className={styles.form}
              onSubmit={async (e) => {
                await handleSubmit(e);
                form.reset();
              }}
              action={actionRoute(action)}
              method="POST"
              encType="multipart/form-data"
            >
              <Field
                name="tone"
                id="tone"
                component={SelectField}
                type="tone"
                label={t('tone')}
                placeholder={t('inputPlaceholder')}
                required={false}
              >
                {Object.values(tones).map((tone) => (
                  <option key={tone} value={tone}>
                    {capitalizeFirstLetter(t(tone))}
                  </option>
                ))}
              </Field>
              <Field
                name="content"
                id="content"
                component={InputField}
                type="textarea"
                label={t('content')}
                placeholder={t('inputPlaceholder')}
                required={false}
              />
              <Field name="parentId">
                {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
              </Field>
              <div className={styles.buttons}>
                <Button
                  buttonType="submit"
                  label={t('reply')}
                  type={ACTION}
                  disabled={submitting || invalid}
                  loading={submitting}
                />
              </div>
            </form>
          </div>
        );
      }}
    />
  );
};

CommentForm.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

CommentForm.defaultProps = {
  className: null,
};

export default Translate(messages)(CommentForm);
