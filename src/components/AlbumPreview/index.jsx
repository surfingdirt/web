import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ResponsiveImage from 'Components/ResponsiveImage';
import { albumRoute, photoRoute, videoRoute } from 'Utils/links';

import styles from './styles.scss';

// TODO: refine this after settling on a design, as this will guide which image size loads.
// Note: keep it simple with 3 media queries
const sizes = `(max-width:320px) 90px, (min-width:321px) 100px, (min-width:1024px) 150px`;

const AlbumPreview = ({ album: { id: albumId, media, title: albumTitle } }) => {
  if (!media || media.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <ul className={styles.items}>
        {media.map(({ id, mediaType, thumbs }) => {
          return (
            <li key={id} className={styles.item}>
              <Link
                className={styles.link}
                to={mediaType === 'PHOTO' ? photoRoute(id) : videoRoute(id)}
              >
                <ResponsiveImage alt="" images={thumbs} sizes={sizes} />
              </Link>
            </li>
          );
        })}
      </ul>
      <Link to={albumRoute(albumId)}>{albumTitle}</Link>
    </Fragment>
  );
};

AlbumPreview.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.string.isRequired,
    media: PropTypes.any,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumPreview;
