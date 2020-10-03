import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MEDIA from 'Apollo/queries/media.gql';
import Card, { cardTypes } from 'Components/Widgets/Card';
import DataRenderer from 'Components/Widgets/DataRenderer';
import VideoEditForm from 'Components/Video/EditForm';
import Translate from 'Hocs/Translate';
import { albumRoute } from 'Utils/links';
import { mediaTypes } from 'Utils/media';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;
const { VIDEO } = mediaTypes;

const VideoEdit = (props) => {
  const { match, t } = props;
  const { id } = match.params;

  return (
    <DataRenderer
      query={MEDIA}
      variables={{ id, mediaType: VIDEO.toLowerCase() }}
      render={(data) => {
        const { media } = data;
        const {
          album: {
            id: albumId,
            title: { text: title },
          },
        } = media;

        return (
          <Card title={t('videoEditPage')} type={STANDARD} className={styles.page}>
            <span className={styles.inAlbum}>
              {t('inAlbum')}
              {':'}
            </span>
            <Link to={albumRoute(albumId)}>{title}</Link>
            <VideoEditForm media={media} />
          </Card>
        );
      }}
    />
  );
};

VideoEdit.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(VideoEdit);
