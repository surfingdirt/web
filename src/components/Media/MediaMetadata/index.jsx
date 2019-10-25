import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Paragraph from 'Components/Paragraph/index';
import Translate from 'Hocs/Translate/index';
import { albumRoute, userRoute } from 'Utils/links';

import messages from './messages';
import styles from './styles.scss';

const MediaMetadata = (props) => {
  const { className, media, t } = props;
  const {
    album: { id: albumId, title: albumTitle },
    description,
    submitter: { userId, username },
  } = media;

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
      </div>
    </Fragment>
  );
};

MediaMetadata.propTypes = {
  className: PropTypes.string,
  media: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
};

MediaMetadata.defaultProps = {
  className: null,
};

export default Translate(messages)(MediaMetadata);
