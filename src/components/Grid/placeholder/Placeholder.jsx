import React from 'react';

import styles from './styles.scss';

const VideoCardPlaceholder = () => (
  <div className={styles.container} aria-hidden="true">
    <div className={`${styles.placeholder} ${styles.preview}`} />
  </div>
);

export default VideoCardPlaceholder;
