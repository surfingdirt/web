import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AutoLink from 'Components/Widgets/AutoLink';
import Menu from 'Components/Widgets/Menu';
import menuStyles from 'Components/Widgets/Menu/styles.scss';
import Userbox, { userboxSizes } from 'Components/User/Userbox';
import Translate from 'Hocs/Translate/index';
import { albumRoute, photoRoute, userRoute, videoRoute } from 'Utils/links';
import { mediaTypes } from 'Utils/media';
import { renderDate } from 'Utils/misc';
import { MEDIA_OVERLAY_MENU } from '~/ids';

import messages from './messages';
import styles from './styles.scss';

const { PHOTO } = mediaTypes;
const { STANDARD } = userboxSizes;

const MediaMetadata = (props) => {
  const {
    album: {
      id: albumId,
      title: { text: albumTitle },
    },
    className,
    directLink,
    media,
    t,
    locale,
  } = props;

  const {
    id,
    date,
    description: { text: description },
    submitter,
    mediaType,
  } = media;
  const { username, userId } = submitter;

  const url = mediaType === PHOTO ? photoRoute(id) : videoRoute(id);

  const options = [];
  if (directLink) {
    options.push(() => (
      <Link to={url} className={menuStyles.menuEntry}>
        {t('directLink')}
      </Link>
    ));
  }

  return (
    <div className={className}>
      <div className={styles.topRow}>
        <div className={styles.submitterWrapper}>
          <Userbox className={styles.user} size={STANDARD} user={submitter} renderName={false} />
          <div className={styles.nameWrapper}>
            <span>{t('postedBy')}</span>
            <Link to={userRoute(userId)}>{username}</Link>
          </div>
        </div>
        {options.length > 0 && (
          <Menu
            menuId={MEDIA_OVERLAY_MENU}
            className={styles.menu}
            triggerLabel={t('overlayMenuLabel')}
            options={options}
          />
        )}
      </div>
      <div className={styles.secondRow}>
        <span className={styles.metadataItemName}>{t('inAlbum')}</span>
        <Link to={albumRoute(albumId)}>{albumTitle}</Link>
        <span aria-hidden className="separator" />
        <span className={styles.date}>{renderDate(date, locale)}</span>
      </div>
      {description && (
        <div className={styles.description}>
          <AutoLink ugc>{description}</AutoLink>
        </div>
      )}
    </div>
  );
};

MediaMetadata.propTypes = {
  album: PropTypes.shape().isRequired,
  className: PropTypes.string,
  directLink: PropTypes.bool,
  locale: PropTypes.string.isRequired,
  media: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
};

MediaMetadata.defaultProps = {
  className: null,
  directLink: true,
};

export default Translate(messages)(MediaMetadata);
