import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'Components/Grid';
import TextVideo from 'Components/VideoRenderers/TextVideo';

import styles from './styles.scss';

const LiveShelf = ({ items, colCount }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.liveButton} />
      <Grid renderer={TextVideo} type={`col${colCount}`} items={items.slice(0, colCount)} />
    </div>
  );
};

LiveShelf.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  colCount: PropTypes.number.isRequired,
};

export default LiveShelf;
