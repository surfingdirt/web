import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ALBUM_WITH_MEDIA from 'Apollo/queries/albumWithMedia.gql';
import Card, { cardTypes } from 'Components/Widgets/Card';
import DataRenderer from 'Components/Widgets/DataRenderer';
import PhotoUploadForm from 'Components/Photo/UploadForm';
import Translate from 'Hocs/Translate';
import { albumRoute } from 'Utils/links';
import { mediaPageSize } from 'Utils/media';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;

class NewPhoto extends React.Component {
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
        query={ALBUM_WITH_MEDIA}
        variables={{
          id: albumId,
          countItems: mediaPageSize,
          startItem: 0,
        }}
        render={({
          album: {
            title: { text: title },
          },
        }) => (
          <Card title={t('photoPostPage')} type={STANDARD} className={styles.page}>
            <span className={styles.postingTo}>
              {t('postingToAlbum')}
              {':'}
            </span>
            <Link to={albumRoute(albumId)}>{title}</Link>
            <PhotoUploadForm albumId={albumId} />
          </Card>
        )}
      />
    );
  }
}

export default Translate(messages)(NewPhoto);
