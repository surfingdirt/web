import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate';
import { previewResizeAndOrientFile } from 'Utils/imageProcessing';
import { maxPhotoSize } from 'Utils/media';
import { photoRoute } from 'Utils/links';
import AppContext from '~/contexts';

import PageContent from './pageContent';
import messages from './messages';
import styles from './styles.scss';
import { STEP_INITIAL, STEP_LIST_SELECTED, STEP_UPLOADING, STEP_DONE, STEP_ERROR } from './steps';
import {
  UPLOAD_STATE_INITIAL,
  UPLOAD_STATE_UPLOADING,
  UPLOAD_STATE_WAITING,
  UPLOAD_STATE_FINISHED,
  UPLOAD_STATE_ERROR,
} from './uploadStates';

const MAX_WIDTH = maxPhotoSize;
const MAX_HEIGHT = maxPhotoSize;

const initialState = {
  currentStep: STEP_INITIAL,
  files: [],
  uploads: [],
};

class BatchUploadForm extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    albumId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = Object.assign({}, initialState);

    this.workCanvasRef = React.createRef();

    this.onRemoveItemClick = this.onRemoveItemClick.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  onReset() {
    this.setState(Object.assign({}, initialState));
  }

  async onRemoveItemClick(toBeRemoved) {
    const { files, uploads, currentStep } = this.state;

    const filterFn = (file) => file.name !== toBeRemoved;
    const newFiles = files.filter(filterFn);
    const newUploads = uploads.filter(filterFn);

    // Note: this will likely cause issues if there is more state stored in the page
    // after files are selected:
    const newStep = newFiles.length > 0 ? currentStep : STEP_INITIAL;

    this.setState({ files: newFiles, uploads: newUploads, currentStep: newStep });
  }

  async onSelect(files) {
    const { files: oldFiles } = this.state;
    // Use slice to make sure we don't pollute the old array.
    const allFiles = oldFiles.slice();
    Array.from(files).forEach((file) => {
      allFiles.push(file);
    });

    const uploads = [];

    for await (const file of allFiles) {
      let upload;
      try {
        upload = await previewResizeAndOrientFile(
          file,
          this.workCanvasRef.current,
          MAX_WIDTH,
          MAX_HEIGHT,
        );
      } catch (error) {
        upload = {
          name: file.name,
          error: true,
        };
      }
      uploads.push(Object.assign({ state: UPLOAD_STATE_INITIAL }, upload));
    }

    this.setState({ files: allFiles, uploads, currentStep: STEP_LIST_SELECTED });
  }

  onStop() {
    this.setState({ currentStep: STEP_LIST_SELECTED });
  }

  async onSubmit(mutate, values) {
    const { albumId, mediaSubType } = values;
    const { uploads } = this.state;
    const input = { albumId, mediaSubType };

    const newUploads = uploads
      .map((upload) => Object.assign(upload, { state: UPLOAD_STATE_WAITING }))
      .filter((upload) => {
        // Skip error files entirely
        return !upload.error;
      });

    this.setState({ currentStep: STEP_UPLOADING, uploads: newUploads }, () => {
      uploads
        .reduce(
          (chain, upload, index) => chain.then(() => this.uploadPromise(index, input, mutate)),
          Promise.resolve(),
        )
        .then(() => {
          this.setState({ currentStep: STEP_DONE });
        });
    });
  }

  uploadPromise(index, input, mutate) {
    const { uploads } = this.state;
    const upload = uploads[index];
    const uploadingUploads = uploads.slice();
    uploadingUploads[index].state = UPLOAD_STATE_UPLOADING;
    this.setState({ uploads: uploadingUploads });

    return mutate({ variables: { file: upload.blob, input } })
      .then((response) => {
        let state = UPLOAD_STATE_FINISHED;
        let link;
        try {
          const {
            data: {
              createPhoto: { id },
            },
          } = response;
          link = photoRoute(id);
        } catch(err) {
          console.error('Upload error', response);
          state = UPLOAD_STATE_ERROR;
          link = null;
        }
        const doneUploads = uploads.slice();
        doneUploads[index].state = state;
        doneUploads[index].link = link;
        this.setState({ uploads: doneUploads });
      })
      .catch((err) => {
        console.error(`Error while uploading photo ${index}`, err);
        const errUploads = uploads.slice();
        errUploads[index].state = UPLOAD_STATE_ERROR;
        this.setState({ uploads: errUploads });
      });
  }

  render() {
    const { albumId } = this.props;
    const { currentStep, uploads } = this.state;

    return (
      <Fragment>
        <canvas ref={this.workCanvasRef} className={styles.workCanvas} />
        <PageContent
          step={currentStep}
          uploads={uploads}
          albumId={albumId}
          onReset={this.onReset}
          onRemoveItemClick={this.onRemoveItemClick}
          onSelect={this.onSelect}
          onSubmit={this.onSubmit}
          onStop={this.onStop}
        />
      </Fragment>
    );
  }
}

export default Translate(messages)(BatchUploadForm);
