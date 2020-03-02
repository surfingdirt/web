import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form, Field } from 'react-final-form';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router';

import UPDATE_COMMENT from 'Apollo/mutations/updateComment2.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import InputField from 'Components/Widgets/Form/InputField';
import SelectField from 'Components/Widgets/Form/SelectField';
import Translate from 'Hocs/Translate';
import { getParentRoute, tones } from 'Utils/comments';
import { actionRoute } from 'Utils/links';
import { CommentType } from 'Utils/types';
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { COMMENT_UPDATE } = actions;
const { ACTION } = buttonTypes;

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const CommentEditForm = ({ className, comment, t }) => {
  const { id, parentId, parentType } = comment;

  const [redirectTo, setRedirectTo] = useState(null);

  const { locale } = useContext(AppContext);
  const [updateComment] = useMutation(UPDATE_COMMENT);

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
      const input = {
        tone: values.tone,
        content: { text: values.content.text, locale },
      };
      await updateComment({ variables: { id, input } });
      setRedirectTo(getParentRoute(parentType, parentId));
    } catch (e) {
      errors = { content: 'some error' };
    }
    return errors;
  };

  const initialValues = {
    content: comment.content,
    id: comment.id,
    tone: comment.tone,
  };

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <Form
      initialValues={initialValues}
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
              action={actionRoute(COMMENT_UPDATE)}
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
                name="content[text]"
                id="content"
                component={InputField}
                type="textarea"
                label={t('content')}
                placeholder={t('inputPlaceholder')}
                required={false}
              />

              {/* These hidden fields are here for JS-less only */}
              <Field name="id">
                {(fieldProps) => <input {...fieldProps.input} type="hidden" />}
              </Field>
              <Field name="content[locale]">
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

CommentEditForm.propTypes = {
  className: PropTypes.string,
  comment: CommentType.isRequired,
  t: PropTypes.func.isRequired,
};

CommentEditForm.defaultProps = {
  className: null,
};

export default Translate(messages)(CommentEditForm);
