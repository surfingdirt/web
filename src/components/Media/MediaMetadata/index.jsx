import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Paragraph from 'Components/Paragraph/index';
import Translate from 'Hocs/Translate/index';
import { albumRoute, photoRoute, videoRoute, userRoute } from 'Utils/links';
import { mediaTypes } from 'Utils/media';

import messages from './messages';
import styles from './styles.scss';

const { PHOTO } = mediaTypes;

const MediaMetadata = (props) => {
  const {
    album: { id: albumId, title: albumTitle },
    className,
    directLink,
    media,
    t,
  } = props;
  const {
    id,
    description,
    submitter: { userId, username },
    mediaType,
  } = media;

  const url = mediaType === PHOTO ? photoRoute(id) : videoRoute(id);

  return (
    <Fragment>
      <div className={className}>
        {description && <Paragraph>{description}</Paragraph>}
        <div className={styles.metadataItem}>
          <span className={styles.metadataItemName}>{t('postedBy')}</span>
          <Link to={userRoute(userId)}>{username}</Link>
        </div>

        <div className={styles.metadataItem}>
          <span className={styles.metadataItemName}>{t('inAlbum')}</span>
          <Link to={albumRoute(albumId)}>{albumTitle}</Link>
        </div>
        <div className={styles.metadataItem}>
          {directLink && <Link to={url}>{t('directLink')}</Link>}
        </div>
      </div>
    </Fragment>
  );
};

MediaMetadata.propTypes = {
  album: PropTypes.shape().isRequired,
  className: PropTypes.string,
  directLink: PropTypes.bool,
  media: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
};

MediaMetadata.defaultProps = {
  className: null,
  directLink: true,
};

export default Translate(messages)(MediaMetadata);
