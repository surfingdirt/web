import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CommentList from 'Components/Comment/List';
import Mosaic from 'Components/Media/Layouts/Mosaic';
import Date from 'Components/Widgets/Date';
import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';
import iconSizes from 'Utils/iconSizes';
import { albumRoute, photoRoute, videoRoute } from 'Utils/links';
import { FeedEntryType } from 'Utils/types';

import FeedEntryWrapper from './FeedEntryWrapper';
import { getAlbumFeedEntryParts } from './Types/Album';
import { getUserFeedEntryParts } from './Types/User';
import messages from './messages';
import styles from './styles.scss';

const { COMMENT, MULTIPLE, PHOTO, VIDEO } = icons;

const COMMENT_ITEMTYPE = 'comment';
const PHOTO_ITEMTYPE = 'photo';
const VIDEO_ITEMTYPE = 'video';

const ALBUM_TYPE = 'Album';
const COMMENT_TYPE = 'Comment';
const MEDIA_TYPE = 'Media';
const USER_TYPE = 'User';

const iconSize = iconSizes.SMALL;

const getIconFromSubItems = (subItems) => {
  let hasMultipleTypes = false;
  let lastType;
  for (let i = 0, l = subItems.length; i < l; i += 1) {
    const current = subItems[i];
    if (lastType && current.itemType !== lastType) {
      hasMultipleTypes = true;
      break;
    }
    lastType = current.itemType;
  }

  if (hasMultipleTypes) {
    return getIcon({ type: MULTIPLE, presentationOnly: true, size: iconSize });
  }

  switch (lastType) {
    case COMMENT_ITEMTYPE:
      return getIcon({ type: COMMENT, presentationOnly: true, size: iconSize });
    case PHOTO_ITEMTYPE:
      return getIcon({ type: PHOTO, presentationOnly: true, size: iconSize });
    case VIDEO_ITEMTYPE:
      return getIcon({ type: VIDEO, presentationOnly: true, size: iconSize });
    default:
      throw new Error(`Unsupported subItem type '${lastType}'`);
  }
};

const getHeaderFromSubItems = ({ item, subItems }, t) => {
  const keyMap = {
    comment: 'newComments',
    photo: 'newPhotos',
    video: 'newVideos',
  };

  const getItemLink = ({ id, __typename: type, mediaType }) => {
    switch (type) {
      case ALBUM_TYPE:
        return albumRoute(id);
      case MEDIA_TYPE:
        if (mediaType.toLowerCase() === 'photo') {
          return photoRoute(id);
        }
        return videoRoute(id);
      default:
        throw new Error(`Unsupported type '${type}'`);
    }
  };

  const contentEntries = Object.entries(
    subItems.reduce((acc, { itemType }) => {
      if (typeof acc[itemType] === 'undefined') {
        acc[itemType] = 1;
      } else {
        acc[itemType] += 1;
      }
      return acc;
    }, {}),
  ).map(([type, count]) => {
    const key = keyMap[type];
    const translation = t(key)(count);
    return <li key={type}>{translation}</li>;
  });

  const title = item.title.text;

  return (
    <Fragment>
      <ul className={styles.headerChildrenList}>{contentEntries}</ul>
      <span className={styles.addedTo}>{t('addedTo')}</span>
      <Link title={title} to={getItemLink(item)}>
        {title}
      </Link>
    </Fragment>
  );
};

const getAttrsFromFedEntry = (feedEntry, locale, t) => {
  let attrs = {};

  const { date, item, subItems } = feedEntry;
  // eslint-disable-next-line no-underscore-dangle
  const type = item.__typename;

  if (subItems.length === 0) {
    // Render top-level items only
    if (type === ALBUM_TYPE) {
      attrs = getAlbumFeedEntryParts(date, item);
    } else if (type === USER_TYPE) {
      attrs = getUserFeedEntryParts(date, item);
    } else {
      throw new Error(`Unsupported top-level item type '${type}'`);
    }
  } else {
    // Subitems are the main attraction here
    if (type === ALBUM_TYPE) {
      const media = subItems
        .filter(({ itemType }) => [PHOTO_ITEMTYPE, VIDEO_ITEMTYPE].includes(itemType))
        .map(({ item: i }) => i);
      attrs.content = <Mosaic album={item} media={media} />;
    } else if (type === MEDIA_TYPE) {
      const comments = subItems
        .filter(({ itemType }) => itemType === COMMENT_ITEMTYPE)
        .map(({ item: i }) => i);
      const renderDate = comments.length > 1;

      let commentType = type;
      if (commentType === MEDIA_TYPE) {
        commentType = item.mediaType.toLowerCase();
      }

      attrs.content = (
        <CommentList
          className=""
          comments={comments}
          type={commentType}
          id={item.id}
          renderDate={renderDate}
        />
      );
    } else {
      throw new Error(`Unsupported top-level item type '${type}'`);
    }
    attrs.header = getHeaderFromSubItems(feedEntry, t);
    attrs.icon = getIconFromSubItems(subItems);
  }

  attrs.footer = <Date className={styles.date} date={date} locale={locale} />;
  return attrs;
};

const Feed = ({ entries, locale, t }) => (
  <Fragment>
    <ul className={styles.feed}>
      {entries.map((entry) => {
        const attrs = getAttrsFromFedEntry(entry, locale, t);
        return (
          <li className={styles.feedEntry} key={entry.date}>
            <FeedEntryWrapper {...attrs} />
          </li>
        );
      })}
    </ul>
  </Fragment>
);

Feed.propTypes = {
  entries: PropTypes.arrayOf(FeedEntryType).isRequired,
  locale: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Feed);
