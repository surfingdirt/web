import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MediaOverlay from 'Components/Media/MediaOverlay';
import MediaThumb from 'Components/Media/MediaThumb/index';
import { modalTypes } from 'Components/Widgets/Modal';

import Attribution from 'Components/Widgets/Attribution';
import Date from 'Components/Widgets/Date';
import { userboxSizes } from 'Components/User/Userbox';
import WithModal from 'Hocs/WithModal';
import Translate from 'Hocs/Translate';
import { photoRoute, videoRoute } from 'Utils/links';
import { mediaPageSize, mediaTypes } from 'Utils/media';
import { AlbumType, MediaType } from 'Utils/types';

import messages from './messages';
import styles from './styles.scss';

const { HERO } = modalTypes;
const countItems = mediaPageSize;
const { SMALL } = userboxSizes;
const { PHOTO } = mediaTypes;

const DetailsFull = ({ album, className, item, index, locale, media, t }) => {
  const {
    title: { text: albumTitle },
  } = album;
  const {
    date,
    id,
    mediaType,
    submitter,
    title: { text: title },
    thumbs,
  } = item;
  const attrs = { className: styles.link, id, mediaType, title, thumbs };
  const to = mediaType === PHOTO ? photoRoute(id) : videoRoute(id);

  const ThumbWithModal = WithModal({
    ariaLabel: t('mediaPreviewModal'),
    modalContent: (
      <MediaOverlay album={album} media={media} countItems={countItems} index={index} />
    ),
    modalTitle: title || albumTitle,
    tag: 'li',
    type: HERO,
  })(
    <article className={classnames(styles.wrapper, className)}>
      <MediaThumb {...attrs} objectFit />
      <div className={styles.info}>
        {title && (
          <Link to={to}>
            <h1 className={styles.title}>{title}</h1>
          </Link>
        )}
        <div className={classnames(styles.metadata, { [styles.bottom]: !title })}>
          <Attribution
            className={styles.attribution}
            submitter={submitter}
            userboxSize={SMALL}
            short
          />
          <Date className={styles.date} date={date} locale={locale} />
        </div>
      </div>
    </article>,
  );

  return <ThumbWithModal />;
};

DetailsFull.propTypes = {
  album: AlbumType.isRequired,
  className: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  locale: PropTypes.string.isRequired,
  item: MediaType.isRequired,
  media: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(DetailsFull);
