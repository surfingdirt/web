import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router';
import createDecorator from 'final-form-calculate';

import CREATE_VIDEO_MUTATION from 'Apollo/mutations/createVideo2.gql';
import Button, { buttonTypes } from 'Components/Button';
import InputField from 'Components/Form/InputField';
import VideoEmbed from 'Components/Video/Embed';
import Translate from 'Hocs/Translate';
import { actionRoute, videoRoute } from 'Utils/links';
import { buildEmbedUrl, extractKeyAndSubType } from 'Utils/video';
import actions from '~/actions';

import messages from './messages';
import styles from './styles.scss';
import icons, { getIcon, sizes } from 'Utils/icons';

const { VIDEO_NEW } = actions;
const { ACTION } = buttonTypes;
const { STANDARD } = sizes;

const VIDEO_PREVIEW_WIDTH = 16;
const VIDEO_PREVIEW_HEIGHT = 9;

const urlParser = createDecorator({
  field: 'url',
  updates: {
    mediaSubType: (url) => {
      const { mediaSubType } = extractKeyAndSubType(url);
      return mediaSubType;
    },
    // TODO: implement this through a call to graphQL. Otherwise the same-domain restriction means this is a no-go:
    // title: (url) =>
    //   new Promise((resolve, reject) => {
    //     const { mediaSubType } = extractKeyAndSubType(url);
    //     if (!mediaSubType) {
    //       return reject();
    //     }
    //     const options = {};
    //     fetch(url, options)
    //       .then((response) => response.text())
    //       .then((page) => {
    //         console.log('Fetched:', page);
    //         const regex = /<title>(.*)<\/title>/;
    //         const match = page.match(regex);
    //         console.log(match);
    //         if (match.length >= 1) {
    //           return resolve(match[1]);
    //         } else {
    //           return reject();
    //         }
    //       }).catch((e) => {
    //         console.error('Error while fetching title', e);
    //       });
    //   }),
    vendorKey: (url) => {
      const { vendorKey } = extractKeyAndSubType(url);
      return vendorKey;
    },
  },
});

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

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  async onSubmit(mutate, { url, mediaSubType, ...rest }) {
    const input = Object.assign({}, rest, { mediaSubType: mediaSubType.toUpperCase() });
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
    } else {
      const { mediaSubType, vendorKey } = extractKeyAndSubType(values.url);
      if (!mediaSubType || !vendorKey) {
        errors.url = t('notUnderstood');
      }
    }

    return errors;
  }

  renderPreview(mediaSubType, vendorKey) {
    if (!mediaSubType || !vendorKey) {
      return null;
    }

    const url = buildEmbedUrl(mediaSubType, vendorKey);
    return <VideoEmbed url={url} height={VIDEO_PREVIEW_HEIGHT} width={VIDEO_PREVIEW_WIDTH} />;
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
            decorators={[urlParser]}
            validate={this.validate}
            render={({ handleSubmit, invalid, submitting, submitError, values }) => {
              const { mediaSubType, vendorKey } = values;
              const { displayError } = this.state;
              const errorMessage = submitError || displayError;

              const preview = this.renderPreview(mediaSubType, vendorKey);

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
                        {getIcon({ type: icons.PLAY, size: STANDARD })}
                        <p>{t('pasteBelow')}</p>
                      </div>
                    )}
                  </div>

                  <p
                    className={classnames(styles.error, { [styles.visibleError]: !!errorMessage })}
                  >
                    {errorMessage}
                  </p>
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
                  <Field name="vendorKey">
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
