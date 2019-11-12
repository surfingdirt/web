import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form, Field } from 'react-final-form';
import { Mutation } from 'react-apollo';

import CREATE_PHOTO_MUTATION from 'Apollo/mutations/createPhoto3.gql';
import NavigationLink from 'Components/Widgets/NavigationLink';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import Translate from 'Hocs/Translate';
import icons, { getIcon, sizes } from 'Utils/icons';
import { actionRoute, albumRoute } from 'Utils/links';
import { MEDIA_SUBTYPE_IMG } from 'Utils/media';
import actions from '~/actions';

import messages from './messages';
import Preview from './Preview';
import styles from './styles.scss';

import { STEP_INITIAL, STEP_LIST_SELECTED, STEP_UPLOADING, STEP_DONE, STEP_ERROR } from './steps';

const { PHOTO_BATCH_UPLOAD } = actions;
const { ACTION, NEGATIVE } = buttonTypes;
const { STANDARD } = sizes;

const renderLabel = (step, errorMessage, t) => {
  if (step === STEP_INITIAL) {
    return (
      <label htmlFor="fileInput" className={styles.fileLabel}>
        <p
          className={classnames(styles.error, {
            [styles.visibleError]: !!errorMessage,
          })}
        >
          {errorMessage}
        </p>
        <span className={styles.instructions}>
          {getIcon({ type: icons.PHOTO, size: STANDARD })}
          <p>{t('instructions')}</p>
        </span>
      </label>
    );
  }

  if (step === STEP_LIST_SELECTED) {
    return (
      <label htmlFor="fileInput" className={styles.fileLabelMore}>
        <p
          className={classnames(styles.error, {
            [styles.visibleError]: !!errorMessage,
          })}
        >
          {errorMessage}
        </p>
        <p className={styles.instructionsMore}>{t('instructionsMore')}</p>
      </label>
    );
  }

  return null;
};

class PageContent extends React.Component {
  static propTypes = {
    albumId: PropTypes.string.isRequired,
    onRemoveItemClick: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    uploads: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
    step: PropTypes.number.isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.fileRef = React.createRef();
  }

  render() {
    const {
      albumId,
      onRemoveItemClick,
      onReset,
      onSelect,
      onStop,
      onSubmit,
      uploads,
      step,
      t,
    } = this.props;

    const noFilesChosen = !uploads || uploads.length === 0;

    let beforeForm = null;
    let showForm = true;
    let showButtons = true;

    switch (step) {
      case STEP_INITIAL:
        break;
      case STEP_LIST_SELECTED:
        beforeForm = (
          <ul className={styles.uploads}>
            {uploads.map((upload) => (
              <Preview
                key={`${upload.name}-${upload.state}`}
                onRemoveItemClick={onRemoveItemClick}
                item={upload}
              />
            ))}
          </ul>
        );
        break;
      case STEP_UPLOADING:
        showButtons = false;
        beforeForm = (
          <ul className={styles.uploads}>
            {uploads.map((upload) => (
              <Preview key={`${upload.name}-${upload.state}`} item={upload} />
            ))}
          </ul>
        );
        break;
      case STEP_DONE:
        showForm = false;
        beforeForm = (
          <Fragment>
            <ul className={styles.uploads}>
              {uploads.map((upload) => (
                <Preview key={`${upload.name}-${upload.state}`} item={upload} />
              ))}
            </ul>
            <div className={styles.success}>
              <p>{t('uploadFinished')}</p>
              <p>
                <NavigationLink
                  to={albumRoute(albumId)}
                  label={t('goToAlbum')}
                  icon={icons.ALBUM}
                />
              </p>
            </div>
          </Fragment>
        );
        break;
      case STEP_ERROR:
        break;
      default:
        break;
    }

    return (
      <Mutation
        mutation={CREATE_PHOTO_MUTATION}
        onCompleted={() => {
          console.log('onCompleted');
        }}
        onError={(error) => {
          console.error('Error', error);
        }}
      >
        {(mutate) => (
          <Form
            initialValues={{ albumId, mediaSubType: MEDIA_SUBTYPE_IMG }}
            onSubmit={async (values) => {
              const ret = await onSubmit(mutate, values);
              return ret;
            }}
            render={({ handleSubmit, submitError, submitting }) => {
              const errorMessage = !!submitError;
              return (
                <Fragment>
                  {beforeForm}
                  {showForm && (
                    <form
                      action={actionRoute(PHOTO_BATCH_UPLOAD)}
                      method="POST"
                      encType="multipart/form-data"
                      className={styles.form}
                      onSubmit={handleSubmit}
                    >
                      {renderLabel(step, errorMessage, t)}
                      <Field name="file">
                        {({ input: { onChange } }) => (
                          <input
                            className={styles.fileInput}
                            type="file"
                            id="fileInput"
                            name="file"
                            onChange={async (e) => {
                              onChange(e);
                              await onSelect(this.fileRef.current.files);
                            }}
                            ref={this.fileRef}
                            multiple
                          />
                        )}
                      </Field>

                      <Field name="albumId">
                        {(props) => <input {...props.input} type="hidden" />}
                      </Field>
                      <Field name="mediaSubType">
                        {(props) => <input {...props.input} type="hidden" />}
                      </Field>

                      <div className={styles.buttons}>
                        {showButtons ? (
                          <Fragment>
                            <Button
                              onClick={onReset}
                              buttonType="reset"
                              label={t('clear')}
                              type={NEGATIVE}
                            />
                            <Button
                              disabled={submitting || noFilesChosen}
                              loading={submitting}
                              buttonType="submit"
                              label={t('upload')}
                              type={ACTION}
                            />
                          </Fragment>
                        ) : (
                          <Button onClick={onStop} label={t('stopUploads')} type={NEGATIVE} />
                        )}
                      </div>
                    </form>
                  )}
                </Fragment>
              );
            }}
          />
        )}
      </Mutation>
    );
  }
}

export default Translate(messages)(PageContent);
