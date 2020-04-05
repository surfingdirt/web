import React from 'react';
import PropTypes from 'prop-types';

import Details from 'Components/Album/Items/Details';

import styles from './styles.scss';

const AlbumList = ({ album, media }) => (
  <ul className={styles.list}>
    {media.map((item, index) => {
      const attrs = {
        album,
        className: styles.item,
        index,
        item,
        media,
      };

      return <Details key={item.id} {...attrs} />;
    })}
  </ul>
);

AlbumList.propTypes = {
  album: PropTypes.objectOf(PropTypes.any).isRequired,
  media: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default AlbumList;
