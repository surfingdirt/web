import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router';

import CREATE_VIDEO_MUTATION from 'Apollo/mutations/createVideo.gql';
import GET_VIDEO_INFO from 'Apollo/queries/getVideoInfo.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import InputField from 'Components/Widgets/Form/InputField';
import VideoEmbed from 'Components/Video/Embed';
import Translate from 'Hocs/Translate';
import icons, { getIcon, sizes } from 'Utils/icons';
import { actionRoute, videoRoute } from 'Utils/links';
import { updateHomeQueryAfterMediaUpload, updateAlbumQueryAfterMediaUpload } from 'Utils/media';
import actions from '~/actions';
import AppContext from '~/contexts';

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
