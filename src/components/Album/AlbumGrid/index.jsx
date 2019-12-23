import React from 'react';
import PropTypes from 'prop-types';

import MediaOverlay from 'Components/Media/MediaOverlay';
import MediaThumb from 'Components/Media/MediaThumb/index';
import { modalTypes } from 'Components/Widgets/Modal';

import WithModal from 'Hocs/WithModal';
import Translate from 'Hocs/Translate';
import { mediaPageSize } from 'Utils/media';

import messages from './messages';
import styles from './styles.scss';

const { HERO } = modalTypes;
const countItems = mediaPageSize;

const AlbumGrid = ({ album, media, t }) => (
  <div className={styles.grid}>
    {media.map((item, index) => {
      const { title: albumTitle } = album;
      const { id, mediaType, title, thumbs } = item;
      const attrs = { className: styles.link, id, mediaType, title, thumbs };

      const ThumbWithModal = WithModal({
        ariaLabel: t('mediaPreviewModal'),
        modalContent: (
          <MediaOverlay album={album} media={media} countItems={countItems} index={index} />
        ),
        modalTitle: title || albumTitle,
        type: HERO,
      })(<MediaThumb {...attrs} objectFit />);

      return <ThumbWithModal key={id} />;
    })}
  </div>
);

AlbumGrid.propTypes = {
  album: PropTypes.objectOf(PropTypes.any).isRequired,
  media: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(AlbumGrid);
