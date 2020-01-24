import React, { useState } from 'react';
import PropTypes from 'prop-types';

import STEPS from './steps';
import Step1 from './Step1';
import Step2 from './Step2';

const { STEP1, STEP2 } = STEPS;

const VideoUploadForm = ({ albumId }) => {
  const [step, setStep] = useState(STEP1);
  const [url, setUrl] = useState(null);

  switch (step) {
    case STEP1:
      return (
        <Step1
          onSubmit={(values) => {
            const { url: newUrl } = values;
            setUrl(newUrl);
            setStep(STEP2);
          }}
        />
      );
    case STEP2:
      return <Step2 albumId={albumId} url={url} />;
    default:
      throw new Error(`Unknown step '${step}'`);
  }
};

VideoUploadForm.propTypes = {
  albumId: PropTypes.string.isRequired,
};

export default VideoUploadForm;
