import React from 'react';
import PropTypes from 'prop-types';

import MediaOverlay from 'Components/Media/MediaOverlay';
import MediaThumb from 'Components/Media/MediaThumb/index';
import { modalTypes } from 'Components/Modal';

import WithModal from 'Hocs/WithModal';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const { HERO } = modalTypes;

const AlbumGrid = ({ album, media, t }) => {
  return (
    <div className={styles.grid}>
      {media.map((item, index) => {
        const { title: albumTitle } = album;
        const { id, mediaType, title, thumbs } = item;
        const attrs = { className: styles.link, id, mediaType, title, thumbs };

        const ThumbWithModal = WithModal({
          ariaLabel: t('mediaPreviewModal'),
          modalContent: <MediaOverlay album={album} media={media} index={index} />,
          modalTitle: title || albumTitle,
          type: HERO,
        })(<MediaThumb {...attrs} objectFit />);

        return (
          <div key={id} className={styles.item}>
            <ThumbWithModal />
          </div>
        );
      })}
    </div>
  );
};

AlbumGrid.propTypes = {
  album: PropTypes.objectOf(PropTypes.any).isRequired,
  media: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(AlbumGrid);
