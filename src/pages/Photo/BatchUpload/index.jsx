import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ALBUM from 'Apollo/queries/album2.gql';
import Card, { cardTypes } from 'Components/Widgets/Card';
import DataRenderer from 'Components/Widgets/DataRenderer';
import PhotoBatchUploadForm from 'Components/Photo/BatchUploadForm';
import Translate from 'Hocs/Translate';
import { albumRoute } from 'Utils/links';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;

class BatchUpload extends React.Component {
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    t: PropTypes.func.isRequired,
  };

  static contextType = AppContext;

  render() {
    const { match, t } = this.props;
    const { galleryAlbumId } = this.context;
    const { id } = match.params;
    const albumId = id || galleryAlbumId;
    return (
      <DataRenderer
        query={ALBUM}
        variables={{ id: albumId }}
        render={({ album: { title } }) => (
          <Card title={t('batchPhotoUpload')} type={STANDARD} className={styles.page}>
            <span className={styles.postingTo}>{t('postingToAlbum')}</span>
            <Link to={albumRoute(albumId)}>{title.text}</Link>
            <PhotoBatchUploadForm albumId={albumId} />
          </Card>
        )}
      />
    );
  }
}

export default Translate(messages)(BatchUpload);
