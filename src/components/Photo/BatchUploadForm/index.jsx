import React from 'react';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';

import PageContent from './pageContent';
import messages from './messages';
import styles from './styles.scss';


const STEP_INITIAL = 0;
const STEP_LIST_SELECTED = 1;
const STEP_UPLOADING = 2;
const STEP_DONE = 3;
const STEP_ERROR = 4;

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
      thumbs: [],
      canvases: [],
      uploads: [
        /*
        { }
        */
      ],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  async onSubmit(mutate, values) {}

  async validate(values) {}

  render() {
    const { albumId } = this.props;
    const { currentStep } = this.state;

    return <PageContent step={currentStep} albumId={albumId} />;
  }
}

export default Translate(messages)(BatchUploadForm);
