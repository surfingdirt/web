import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const DropCap = ({ word }) => {
  const [letter, ...rest] = word;

  return (
    <span aria-labelledby="word--first" role="text">
      <span aria-hidden="true" className={styles.visible}>
        <span className={styles.dropcap}>{letter}</span>
        {rest}
      </span>
      <span id="word--first" className={styles.hidden}>
        {word}
      </span>
    </span>
  );
};
DropCap.propTypes = {
  word: PropTypes.string.isRequired,
}

export default DropCap;