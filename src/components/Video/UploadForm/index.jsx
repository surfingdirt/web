import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router';

import CREATE_VIDEO_MUTATION from 'Apollo/mutations/createVideo2.gql';
import Button, { buttonTypes } from 'Components/Button';
import InputField from 'Components/Form/InputField';
import Translate from 'Hocs/Translate';
import { actionRoute, videoRoute } from 'Utils/links';
import actions from '~/actions';

import messages from './messages';
import styles from './styles.scss';

const { VIDEO_NEW } = actions;
const { ACTION } = buttonTypes;

class VideoUploadForm extends React.Component {
  static propTypes = {
    albumId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      displayError: null,
      redirectTo: null,
    };

    this.formRef = React.createRef();
    this.previewRef = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  async onSubmit(mutate, input) {
    const response = await mutate({ variables: { input } });
    const { id } = response.data.createVideo;

    this.setState({
      redirectTo: videoRoute(id),
    });
  }

  async validate(values) {
    const { t } = this.props;

    const errors = {};
    if (!values.title) {
      errors.title = t('required');
    }

    if (!values.url) {
      errors.url = t('required');
    }

    return errors;
  }

  render() {
    const { albumId, t } = this.props;
    const { redirectTo } = this.state;

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <Mutation
        mutation={CREATE_VIDEO_MUTATION}
        onCompleted={() => {
          this.setState({ displayError: null });
        }}
        onError={({ ...rest }) => {
          console.error('Error', rest);
          this.setState({ displayError: t('backendError') });
        }}
      >
        {(mutate) => (
          <Form
            initialValues={{ albumId }}
            onSubmit={(values) => {
              return this.onSubmit(mutate, values);
            }}
            validate={this.validate}
            render={({ handleSubmit, invalid, submitting, submitError }) => {
              const { displayError } = this.state;
              const errorMessage = submitError || displayError;
              return (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  action={actionRoute(VIDEO_NEW)}
                  method="POST"
                  encType="multipart/form-data"
                  ref={this.formRef}
                >
                  {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                  <Field
                    name="url"
                    id="url"
                    component={InputField}
                    type="text"
                    label={t('url')}
                    placeholder={t('urlPlaceholder')}
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
                    {(props) => <input {...props.input} type="hidden" />}
                  </Field>
                  <Field name="mediaSubType">
                    {(props) => <input {...props.input} type="hidden" />}
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
        )}
      </Mutation>
    );
  }
}

export default Translate(messages)(VideoUploadForm);
