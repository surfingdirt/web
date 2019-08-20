import React from 'react';
import PropTypes from 'prop-types';

import Card, { cardTypes } from 'Components/Card';
import PhotoUploadForm from 'Components/Photo/UploadForm';
import Translate from 'Hocs/Translate';
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { PHOTO_NEW } = actions;
const { STANDARD } = cardTypes;

class NewPhotoRaw extends React.Component {
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    t: PropTypes.func.isRequired,
  };

  static contextType = AppContext;

  render() {
    const { match, t } = this.props;
    const { galleryAlbumId } = this.context;
    const { id: albumId } = match.params;

    return (
      <Card title={t('photoPostPage')} type={STANDARD} className={styles.page}>
        <PhotoUploadForm albumId={albumId || galleryAlbumId} />
      </Card>
    );
  }
}

export const NewPhoto = Translate(messages)(NewPhotoRaw);