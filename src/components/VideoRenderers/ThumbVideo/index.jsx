import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const ThumbVideo = ({ item: { title, description, id } }) => (
  <div key={id}>
    <div className={styles.preview} />
    <div className={styles.metadata}>
      <a className={styles.title} href={`#${id}`}>
        {title}
      </a>
      <span className={styles.description}>{description}</span>
    </div>
  </div>
);

ThumbVideo.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ThumbVideo;
