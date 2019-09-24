import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form, Field } from 'react-final-form';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router';

import CREATE_PHOTO_MUTATION from 'Apollo/mutations/createPhoto3.gql';
import Button, { buttonTypes } from 'Components/Button';
import InputField from 'Components/Form/InputField';
import Translate from 'Hocs/Translate';
import icons, { getIcon, sizes } from 'Utils/icons';
import { previewResizeAndOrientFile } from 'Utils/imageProcessing';
import { actionRoute, photoRoute } from 'Utils/links';
import { maxPhotoSize, MEDIA_SUBTYPE_IMG } from 'Utils/media';
import actions from '~/actions';

import messages from './messages';
import styles from './styles.scss';

import { STEP_INITIAL, STEP_LIST_SELECTED, STEP_UPLOADING, STEP_DONE, STEP_ERROR } from './steps';

const { PHOTO_BATCH_UPLOAD } = actions;
const { ACTION } = buttonTypes;
const { STANDARD } = sizes;

const MAX_WIDTH = maxPhotoSize;
const MAX_HEIGHT = maxPhotoSize;

class PageContent extends React.Component {
  static propTypes = {
    albumId: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    previews: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
    step: PropTypes.number.isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.fileRef = React.createRef();
    this.validate = this.validate.bind(this);
  }

  async validate(values) {
    const fileEl = this.fileRef.current;
    console.log('validate', fileEl.files);
  }

  render() {
    const { albumId, onSelect, onSubmit, previews, step, t } = this.props;

    let beforeForm;
    let showForm = true;
    switch (step) {
      case STEP_INITIAL:
        beforeForm = <p>pick some files yo</p>;
        break;
      case STEP_LIST_SELECTED:
        beforeForm = (
          <Fragment>
            <p>you picked files: {previews.length}</p>
            <ul className={styles.filePreviews}>
              {previews.map(({ blob, width, height }, index) => (
                <li key={index}>
                  <button>X</button>
                  <img height={height} width={width} src={URL.createObjectURL(blob)} />
                </li>
              ))}
            </ul>
          </Fragment>
        );
        break;
      case STEP_UPLOADING:
        break;
      case STEP_DONE:
        showForm = false;
        break;
      case STEP_ERROR:
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
            onSubmit={(values) => {
              // TODO: initiate the upload loop here
              return onSubmit(mutate, values);
            }}
            validate={this.validate}
            render={() => (
              <Fragment>
                {beforeForm}
                {showForm && (
                  <form
                    action={actionRoute(PHOTO_BATCH_UPLOAD)}
                    method="POST"
                    encType="multipart/form-data"
                  >
                    <Field name="file">
                      {({ input: { onChange } }) => (
                        <input
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

                    <input type="hidden" name="albumId" value={albumId} />
                    <input type="hidden" name="mediaSubType" value={MEDIA_SUBTYPE_IMG} />
                    <Button buttonType="submit" label={t('upload')} type={ACTION} />
                  </form>
                )}
              </Fragment>
            )}
          />
        )}
      </Mutation>
    );
  }
}

export default Translate(messages)(PageContent);
