import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ALBUM from 'Apollo/queries/album2.gql';
import Card, { cardTypes } from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import VideoUploadForm from 'Components/Video/UploadForm';
import Translate from 'Hocs/Translate';
import { albumRoute } from 'Utils/links';
import AppContext from '~/contexts';

import styles from './styles.scss';
import messages from './messages';

const { STANDARD } = cardTypes;

export class NewVideoRaw extends React.Component {
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
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
          <Card title={t('videoPostPage')} type={STANDARD} className={styles.page}>
            <span className={styles.postingTo}>{t('postingToAlbum')}{':'}</span>
            <Link to={albumRoute(albumId)}>{title}</Link>
            <VideoUploadForm albumId={albumId} />
          </Card>
        )}
      />
    );
  }
}

export const NewVideo = Translate(messages)(NewVideoRaw);