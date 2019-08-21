import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';

import MediaThumb from 'Components/Media/MediaThumb/index';

import styles from './styles.scss';

const breakpointColumnsObj = {
  360: 1,
  960: 2,
  default: 3,
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
        {media.map((item) => {
          const { id, mediaType, title, thumbs } = item;
          const attrs = { className: styles.link, id, mediaType, title, thumbs };
          return <MediaThumb key={id} {...attrs} />;
        })}
      </Masonry>
    );
  }
}
