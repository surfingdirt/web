import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate';
import { previewResizeAndOrientFile } from 'Utils/imageProcessing';
import { maxPhotoSize } from 'Utils/media';
import AppContext from '~/contexts';

import PageContent from './pageContent';
import messages from './messages';
import styles from './styles.scss';
import { STEP_INITIAL, STEP_LIST_SELECTED, STEP_UPLOADING, STEP_DONE, STEP_ERROR } from './steps';
import { photoRoute } from 'Utils/links';

const MAX_WIDTH = maxPhotoSize;
const MAX_HEIGHT = maxPhotoSize;

const UPLOAD_STATE_WAITING = 0;
const UPLOAD_STATE_UPLOADING = 1;
const UPLOAD_STATE_FINISHED = 2;
const UPLOAD_STATE_ERROR = 3;

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
      uploads.push(upload);
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

    const sleep = (ms) => {
      return new Promise((res) => {
        setTimeout(res, ms);
      });
    };

    const uploadPromise = (upload, index) => {
      console.log(`Starting: ${upload.name}`);
      // return mutate({ variables: { file: upload.blob, input } }).then((response) => {
      //   console.log(`Response for ${upload.name}:`, response);
      // });

      return sleep(1500).then(() => {
        console.log(`Done: ${upload.name}`);
        uploads[index].state = 'done!';
        // this.setState
      });
    };

    uploads
      .reduce(
        (chain, upload, index) => chain.then(() => uploadPromise(upload, index)),
        Promise.resolve(),
      )
      .then(() => {
        console.log('uploads', uploads);
      });

    // let i = 0;
    // for await (const file of uploads) {
    //   // TODO: handle showing a photo as uploading
    //   // uploads[i].state = UPLOAD_STATE_UPLOADING;
    //
    //   const input = { albumId, mediaSubType };
    //   const response = await mutate({ variables: { file: file.blob, input } });
    //   const { id } = response.data.createPhoto;
    //   console.log('Finished uploading:', file.name, photoRoute(id));
    //   uploads[i] = {
    //     link: photoRoute(id),
    //   };
    //
    //   i += 1;
    // }

    console.log('onSubmit', mutate, uploads);
    this.setState({ uploads: uploads, currentStep: STEP_DONE });
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
