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

const MAX_WIDTH = maxPhotoSize;
const MAX_HEIGHT = maxPhotoSize;

const initialState = {
  currentStep: STEP_INITIAL,
  files: [],
  previews: [],
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
    this.onSelect = this.onSelect.bind(this);
  }

  onReset() {
    this.setState(Object.assign({}, initialState));
  }

  async onRemoveItemClick(toBeRemoved) {
    const { files, previews, currentStep } = this.state;

    const filterFn = (file) => file.name !== toBeRemoved;
    const newFiles = files.filter(filterFn);
    const newPreviews = previews.filter(filterFn);

    // Note: this will likely cause issues if there is more state stored in the page
    // after files are selected:
    const newStep = newFiles.length > 0 ? currentStep : STEP_INITIAL;

    this.setState({ files: newFiles, previews: newPreviews, currentStep: newStep });
  }

  async onSelect(files) {
    const { files: oldFiles } = this.state;
    // Use slice to make sure we don't pollute the old array.
    const allFiles = oldFiles.slice();
    Array.from(files).forEach((file) => {
      allFiles.push(file);
    });
    const previews = [];

    for (const file of allFiles) {
      let preview;
      try {
        preview = await previewResizeAndOrientFile(
          file,
          this.workCanvasRef.current,
          MAX_WIDTH,
          MAX_HEIGHT,
        );
      } catch (error) {
        preview = {
          name: file.name,
          error: true,
        };
      }
      previews.push(preview);
    }

    this.setState({ files: allFiles, previews, currentStep: STEP_LIST_SELECTED });
  }

  async onSubmit(mutate, values) {
    console.log('onSubmit', mutate, values);
  }

  render() {
    const { albumId } = this.props;
    const { currentStep, previews } = this.state;

    return (
      <Fragment>
        <canvas ref={this.workCanvasRef} className={styles.workCanvas} />
        <PageContent
          step={currentStep}
          previews={previews}
          albumId={albumId}
          onReset={this.onReset}
          onRemoveItemClick={this.onRemoveItemClick}
          onSelect={this.onSelect}
          onSubmit={this.onSubmit}
        />
      </Fragment>
    );
  }
}

export default Translate(messages)(BatchUploadForm);
