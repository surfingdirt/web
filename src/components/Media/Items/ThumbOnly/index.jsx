import React from 'react';
import PropTypes from 'prop-types';

import MediaOverlay from 'Components/Media/MediaOverlay';
import MediaThumb from 'Components/Media/MediaThumb';
import { modalTypes } from 'Components/Widgets/Modal';

import WithModal from 'Hocs/WithModal';
import Translate from 'Hocs/Translate';
import { mediaPageSize } from 'Utils/media';
import { AlbumType, MediaType } from 'Utils/types';

import messages from './messages';
import styles from './styles.scss';

const { HERO } = modalTypes;
const countItems = mediaPageSize;

const ThumbOnly = ({ album, className, item, index, media, t }) => {
  const {
    title: { text: albumTitle },
  } = album;
  const {
    id,
    mediaType,
    title: { text: title },
    thumbs,
  } = item;
  const attrs = { className: styles.link, id, mediaType, title, thumbs };

  const ThumbWithModal = WithModal({
    ariaLabel: t('mediaPreviewModal'),
    className,
    modalContent: (
      <MediaOverlay album={album} media={media} countItems={countItems} index={index} />
    ),
    modalTitle: title || albumTitle,
    tag: 'li',
    type: HERO,
  })(<MediaThumb {...attrs} objectFit />);

  return <ThumbWithModal />;
};

ThumbOnly.propTypes = {
  album: AlbumType.isRequired,
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  item: MediaType.isRequired,
  media: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  t: PropTypes.func.isRequired,
};

ThumbOnly.defaultProps = {
  className: null,
};

export default Translate(messages)(ThumbOnly);
