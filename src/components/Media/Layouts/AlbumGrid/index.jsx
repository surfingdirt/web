import React from 'react';
import PropTypes from 'prop-types';

import ThumbOnly from 'Components/Media/Items/ThumbOnly';

import styles from './styles.scss';

const AlbumGrid = ({ album, media }) => (
  <ul className={styles.grid}>
    {media.map((item, index) => {
      const attrs = {
        album,
        index,
        item,
        media,
      };

      return <ThumbOnly key={item.id} {...attrs} />;
    })}
  </ul>
);

AlbumGrid.propTypes = {
  album: PropTypes.objectOf(PropTypes.any).isRequired,
  media: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default AlbumGrid;
