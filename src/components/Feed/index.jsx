import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';
import iconSizes from 'Utils/iconSizes';
import { renderDate } from 'Utils/misc';
import { FeedEntryType } from 'Utils/types';

import FeedEntryWrapper from './FeedEntryWrapper';
import { getAlbumFeedEntryParts } from './Types/Album';
import { getUserFeedEntryParts } from './Types/User';
import messages from './messages';
import styles from './styles.scss';

const { COMMENT, PHOTO, VIDEO } = icons;

const iconSize = iconSizes.SMALL;

const getIconsFromSubItems = (subItems) =>
  subItems
    .reduce((acc, { itemType }) => {
      if (acc.indexOf(itemType) === -1) {
        acc.push(itemType);
      }
      return acc;
    }, [])
    .map((type) => {
      switch (type) {
        case 'comment':
          return getIcon({ type: COMMENT, presentationOnly: true, size: iconSize });
        case 'photo':
          return getIcon({ type: PHOTO, presentationOnly: true, size: iconSize });
        case 'video':
          return getIcon({ type: VIDEO, presentationOnly: true, size: iconSize });
        default:
          throw new Error(`Unsupported subItem type '${type}'`);
      }
    });

const getContentFromSubItems = ({ item, subItems }) => {
  const contentEntries = Object.entries(
    subItems.reduce((acc, { itemType }) => {
      if (typeof acc[itemType] === 'undefined') {
        acc[itemType] = 1;
      } else {
        acc[itemType] += 1;
      }
      return acc;
    }, {}),
  ).map(([type, count]) => <li key={type}>{`${type}: ${count}`}</li>);

  contentEntries.push(<li>{`On item: ${item.__typename} ${item.title.text}`}</li>);
  return <ul>{contentEntries}</ul>;
};

const getAttrsFromFedEntry = (feedEntry, locale) => {
  let attrs = {};

  const { date, item, subItems } = feedEntry;
  // eslint-disable-next-line no-underscore-dangle
  const type = item.__typename;

  if (subItems.length === 0) {
    // Render top-level items only
    if (type === 'Album') {
      attrs = getAlbumFeedEntryParts(date, item, locale);
    } else if (type === 'User') {
      attrs = getUserFeedEntryParts(date, item, locale);
    } else {
      throw new Error(`Unsupported top-level item type '${type}'`);
    }
  } else {
    // Subitems are the main attraction here
    attrs.content = getContentFromSubItems(feedEntry);
    attrs.header = <p>This is the header</p>;
    attrs.icon = getIconsFromSubItems(subItems);
    attrs.footer = <span className={styles.date}>{renderDate(date, locale)}</span>;
  }

  return attrs;
};

const Feed = ({ entries, locale }) => (
  <Fragment>
    <h1>Feed</h1>
    <ul className={styles.feed}>
      {entries.map((entry, index) => {
        const attrs = getAttrsFromFedEntry(entry, locale);
        return (
          // eslint-disable-next-line react/no-array-index-key
          <li className={styles.feedEntry} key={index}>
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
