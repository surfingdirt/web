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

class BatchUploadForm extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    albumId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentStep: STEP_INITIAL,
      files: [],
      previews: [],
      uploads: [
        /*
        { }
        */
      ],
    };

    this.workCanvasRef = React.createRef();

    this.onSelect = this.onSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSelect(files) {
    console.log('onSelect', files);
    const { oldFiles } = this.state;
    // TODO: build thumbs and canvases out of files
    const allFiles = oldFiles.concat(files);
    const previews = [];

    for (const file of allFiles) {
      const preview = await previewResizeAndOrientFile(
        file,
        this.workCanvasRef.current,
        MAX_WIDTH,
        MAX_HEIGHT,
      );
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
          onSelect={this.onSelect}
          onSubmit={this.onSubmit}
        />
      </Fragment>
    );
  }
}

export default Translate(messages)(BatchUploadForm);
