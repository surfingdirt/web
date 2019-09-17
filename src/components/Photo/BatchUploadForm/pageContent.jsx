import React from 'react';
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

const { PHOTO_BATCH_UPLOAD } = actions;
const { ACTION } = buttonTypes;
const { STANDARD } = sizes;

const MAX_WIDTH = maxPhotoSize;
const MAX_HEIGHT = maxPhotoSize;

class PageContent extends React.Component {
  static propTypes = {
    albumId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { albumId, t } = this.props;

    return (
      <form action={actionRoute(PHOTO_BATCH_UPLOAD)} method="POST" encType="multipart/form-data">
        <input type="file" id="fileInput" name="file" multiple />
        <input type="hidden" name="albumId" value={albumId} />
        <input type="hidden" name="mediaSubType" value={MEDIA_SUBTYPE_IMG} />
        <Button buttonType="submit" label={t('upload')} type={ACTION} />
      </form>
    );
  }
}

export default Translate(messages)(PageContent);
