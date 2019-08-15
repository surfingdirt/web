import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card, { cardTypes } from 'Components/Card';
import Empty from 'Components/Empty';
import Paragraph from 'Components/Paragraph';
import ResponsiveImage from 'Components/ResponsiveImage';
import { albumRoute, photoRoute, videoRoute } from 'Utils/links';

import styles from './styles.scss';

const { STANDARD } = cardTypes;

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
    <Card
      className={styles.wrapper}
      title={albumTitle}
      titleLink={albumRoute(albumId)}
      type={STANDARD}
    >
      {isEmpty ? (
        <Empty />
      ) : (
        <ul className={styles.items}>
          {media.map(({ id, mediaType, thumbs }) => (
            <li key={id} className={styles.item}>
              <Link
                className={styles.link}
                to={mediaType === 'PHOTO' ? photoRoute(id) : videoRoute(id)}
              >
                <ResponsiveImage alt="" images={thumbs} sizes={sizes} />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {description && <Paragraph className={styles.description}>{description}</Paragraph>}
    </Card>
  );
};

AlbumPreview.propTypes = {
  album: PropTypes.shape({
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
