import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';

import ResponsiveImage from 'Components/ResponsiveImage';
import { photoRoute, videoRoute } from 'Utils/links';

import styles from './styles.scss';

// TODO: refine this after settling on a design, as this will guide which image size loads.
const sizes = `(max-width:320px) 90px, (min-width:321px) 100px, (min-width:1024px) 150px`;

const breakpointColumnsObj = {
  360: 1,
  640: 2,
  960: 3,
  default: 4,
};

export default class AlbumGrid extends React.PureComponent {
  static propTypes = {
    media: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  render() {
    const { media } = this.props;

    return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonry}
        columnClassName={styles.column}
      >
        {media.map(({ id, mediaType, title, thumbs }) => (
          <Link
            key={id}
            className={styles.link}
            to={mediaType === 'PHOTO' ? photoRoute(id) : videoRoute(id)}
          >
            <ResponsiveImage alt={title} images={thumbs} sizes={sizes} />
          </Link>
        ))}
      </Masonry>
    );
  }
}
