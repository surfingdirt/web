import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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

const iconSize = iconSizes.SMALL;

const getIconFromSubItems = (subItems) => {
  let hasMultipleTypes = false;
  let lastType;
  for (let i = 0, l = subItems.length; i < l; i++) {
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
    case 'comment':
      return getIcon({ type: COMMENT, presentationOnly: true, size: iconSize });
    case 'photo':
      return getIcon({ type: PHOTO, presentationOnly: true, size: iconSize });
    case 'video':
      return getIcon({ type: VIDEO, presentationOnly: true, size: iconSize });
    default:
      throw new Error(`Unsupported subItem type '${type}'`);
  }
};

const getHeaderFromSubItems = ({ item, subItems }, t) => {
  const keyMap = {
    comment: 'newComments',
    photo: 'newPhotos',
    video: 'newVideos',
  };
  const routeMap = {
    Album: albumRoute,
    Photo: photoRoute,
    Video: videoRoute,
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
      <Link title={title} to={routeMap[item.__typename]}>
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
    if (type === 'Album') {
      attrs = getAlbumFeedEntryParts(date, item);
    } else if (type === 'User') {
      attrs = getUserFeedEntryParts(date, item);
    } else {
      throw new Error(`Unsupported top-level item type '${type}'`);
    }
  } else {
    // Subitems are the main attraction here
    if (type === 'Album') {
      console.log('Rendering album subitems', subItems);
      const media = subItems
        .filter(({ itemType }) => ['photo', 'video'].includes(itemType))
        .map(({ item }) => item);
      attrs.content = <Mosaic album={item} media={media} />;
    } else {
      attrs.content = <p>content not handled yet</p>;
    }
    attrs.header = getHeaderFromSubItems(feedEntry, t);
    attrs.icon = getIconFromSubItems(subItems);
  }

  attrs.footer = <Date className={styles.date} date={date} locale={locale} />;
  return attrs;
};

const Feed = ({ entries, locale, t }) => (
  <Fragment>
    <h1>Feed</h1>
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
