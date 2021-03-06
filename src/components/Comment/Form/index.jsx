import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form, Field } from 'react-final-form';
import { useMutation } from '@apollo/react-hooks';

import CREATE_COMMENT_ALBUM from 'Apollo/mutations/createCommentAlbum.gql';
import CREATE_COMMENT_PHOTO from 'Apollo/mutations/createCommentPhoto.gql';
import CREATE_COMMENT_VIDEO from 'Apollo/mutations/createCommentVideo.gql';
import LIST_COMMENTS from 'Apollo/queries/listComments2.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import InputField from 'Components/Widgets/Form/InputField';
import SelectField from 'Components/Widgets/Form/SelectField';
import Translate from 'Hocs/Translate';
import { parentTypes, tones } from 'Utils/comments';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { COMMENT_NEW_ALBUM, COMMENT_NEW_PHOTO, COMMENT_NEW_VIDEO } = actions;
const { ACTION } = buttonTypes;
const { ALBUM, PHOTO, VIDEO } = parentTypes;

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

export function getReplyAnchorId(id = null) {
  return `reply-${id}`;
}

const CommentForm = ({ className, id: parentId, refetch, t, type }) => {
  const action = ACTIONS[type];
  const mutation = MUTATIONS[type];
  if (!mutation) {
    throw new Error(`Unsupported type '${type}' for comment post mutation`);
  }

  const { locale } = useContext(AppContext);

  const [addComment] = useMutation(mutation, {
    update: (cache, resultObj) => {
      const newItem = Object.values(resultObj.data)[0];

      const queryOptions = {
        query: LIST_COMMENTS,
        variables: {
          parentId,
          parentType: type,
        },
      };
      const { listComments } = cache.readQuery(queryOptions);
      cache.writeQuery(
        Object.assign({}, queryOptions, { data: { listComments: listComments.concat([newItem]) } }),
      );
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
      const input = Object.assign({}, values, {
        content: { text: values.content, locale },
      });
      await addComment({ variables: { input } });
      refetch();
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
              id={getReplyAnchorId(parentId)}
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
  refetch: PropTypes.func,
  t: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

CommentForm.defaultProps = {
  className: null,
  refetch: () => {},
};

export default Translate(messages)(CommentForm);
