import React from 'react';
import PropTypes from 'prop-types';

import Card, { cardTypes } from 'Components/Card';
import Empty from 'Components/Empty';
import Heading, { headingTypes } from 'Components/Heading';
import MediaThumb from 'Components/MediaThumb';
import Paragraph from 'Components/Paragraph';
import icons, { getIcon } from 'Utils/icons';
import { albumRoute } from 'Utils/links';

import styles from './styles.scss';

const { BARE } = cardTypes;
const { SECONDARY } = headingTypes;
const { NEXT, PREVIOUS } = icons;

// TODO: refine this after settling on a design, as this will guide which image size loads.
// Note: keep it simple with 3 media queries
const sizes = `(max-width:320px) 90px, (min-width:321px) 100px, (min-width:1024px) 150px`;

const AlbumPreview = ({
  album: { description, id: albumId, media, title: albumTitle },
  showAttribution,
  renderIfEmpty,
}) => {
  const isEmpty = !media || media.length === 0;
  if (isEmpty && !renderIfEmpty) {
    return null;
  }

  return (
    <Card className={styles.wrapper} type={BARE}>
      {isEmpty ? (
        <Empty />
      ) : (
        <div className={styles.itemWrapper}>
          <ul className={styles.items}>
            {media.map(({ id, mediaType, title, thumbs }) => {
              const attrs = { className: styles.link, id, mediaType, title, thumbs };
              return (
                <li key={id} className={styles.item}>
                  <MediaThumb key={id} {...attrs} />
                </li>
              );
            })}
          </ul>
          <button className={styles.previous} type="button" aria-label="previous">
            {getIcon({ type: PREVIOUS })}
          </button>
          <button className={styles.next} type="button" aria-label="next">
            {getIcon({ type: NEXT })}
          </button>
        </div>
      )}
      <div className={styles.contentWrapper}>
        <Heading className={styles.title} type={SECONDARY} link={albumRoute(albumId)}>
          {albumTitle}
        </Heading>
        {showAttribution && <p>TODO: showAttribution</p>}
        {description && <Paragraph className={styles.description}>{description}</Paragraph>}
      </div>
    </Card>
  );
};

AlbumPreview.propTypes = {
  album: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    media: PropTypes.any,
    title: PropTypes.string.isRequired,
  }).isRequired,
  renderIfEmpty: PropTypes.bool,
  showAttribution: PropTypes.bool,
};

AlbumPreview.defaultProps = {
  renderIfEmpty: false,
  showAttribution: false,
};

export default AlbumPreview;
