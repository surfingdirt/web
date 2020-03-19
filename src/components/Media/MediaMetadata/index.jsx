import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import DELETE_MEDIA from 'Apollo/mutations/deleteMedia.gql';
import Userbox, { userboxSizes } from 'Components/User/Userbox';
import AutoLink from 'Components/Widgets/AutoLink';
import DeleteItemModal from 'Components/Widgets/DeleteItemModal';
import Menu from 'Components/Widgets/Menu';
import menuStyles from 'Components/Widgets/Menu/styles.scss';
import TranslateButton, { translateButtonTypes } from 'Components/Widgets/TranslateButton';
import Translate from 'Hocs/Translate/index';
import {
  albumRoute,
  editPhotoRoute,
  editVideoRoute,
  photoRoute,
  userRoute,
  videoRoute,
} from 'Utils/links';
import { mediaTypes } from 'Utils/media';
import { renderDate } from 'Utils/misc';
import { ActionType } from 'Utils/types';
import AppContext from '~/contexts';
import { MEDIA_OVERLAY_MENU } from '~/ids';

import messages from './messages';
import styles from './styles.scss';

const { PHOTO } = mediaTypes;
const { STANDARD } = userboxSizes;
const { MEDIA } = translateButtonTypes;

const MediaMetadata = (props) => {
  const { features } = useContext(AppContext);
  const [redirectTo, setRedirectTo] = useState(null);

  const {
    album: {
      id: albumId,
      title: { text: albumTitle },
    },
    className,
    isOverlay,
    media,
    t,
    locale,
  } = props;

  const {
    actions,
    id,
    date,
    description,
    submitter,
    mediaType,
    title: { locale: textLocale, original, text: title },
  } = media;
  const { username, userId } = submitter;
  const hasDescription = description && description.text && description.text.length > 0;

  const url = mediaType === PHOTO ? photoRoute(id) : videoRoute(id);

  const options = [];
  if (isOverlay) {
    options.push(() => (
      <Link to={url} className={menuStyles.menuEntry}>
        {t('directLink')}
      </Link>
    ));
  }

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  if (actions.edit) {
    const editUrl = mediaType === PHOTO ? editPhotoRoute(id) : editVideoRoute(id);
    options.push(() => (
      <Link to={editUrl} className={menuStyles.menuEntry}>
        {t('edit')}
      </Link>
    ));
  }

  if (actions.delete && !isOverlay) {
    const variables = { id };
    const update = (cache, resultObj) => {
      const success = !!Object.values(resultObj.data);
      if (!success) {
        console.warn('Received false for media delete', { id });
      }
      // We might need to update the cache
      setRedirectTo(albumRoute(albumId));
    };

    options.push(() => (
      <DeleteItemModal
        mutation={DELETE_MEDIA}
        variables={variables}
        title={title}
        update={update}
        onError={null}
      />
    ));
  }

  // Show the button if the text is in its original form and the locale is not that of the user
  const showTranslateButton = features.translation && original && textLocale !== locale;

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
      {hasDescription && (
        <div className={styles.secondRow}>
          <div className={styles.description}>
            <AutoLink ugc>{description.text}</AutoLink>
          </div>
        </div>
      )}

      <div className={styles.thirdRow}>
        {showTranslateButton && (
          <Fragment>
            <TranslateButton
              className={styles.translateButton}
              type={MEDIA}
              id={id}
              targetLocale={locale}
            />
            <span aria-hidden className="separator" />
          </Fragment>
        )}
        <span className={styles.metadataItemName}>{t('inAlbum')}</span>
        <Link to={albumRoute(albumId)}>{albumTitle}</Link>
        <span aria-hidden className="separator" />
        <span className={styles.date}>{renderDate(date, locale)}</span>
      </div>
    </div>
  );
};

MediaMetadata.propTypes = {
  actions: ActionType.isRequired,
  album: PropTypes.shape().isRequired,
  className: PropTypes.string,
  isOverlay: PropTypes.bool,
  locale: PropTypes.string.isRequired,
  media: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
};

MediaMetadata.defaultProps = {
  className: null,
  isOverlay: true,
};

export default Translate(messages)(MediaMetadata);
