import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const TextVideo = ({ item: { title, id } }) => (
  <div key={id}>
    <div className={styles.metadata}>
      <a className={styles.title} href={`#${id}`}>
        {title}
      </a>
    </div>
  </div>
);

TextVideo.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
export default TextVideo;
