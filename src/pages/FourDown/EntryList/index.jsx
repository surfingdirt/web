import React from 'react';
import PropTypes from 'prop-types';

import EntryItem from './EntryItem';
import styles from './styles.scss';

const EntryList = ({ album, media }) => {
  const items = media.map((item) => {
    const attrs = { album, className: styles.item, item, media };
    return <EntryItem key={item.id} {...attrs} />;
  });

  return <ul className={styles.list}>{items}</ul>;
};
EntryList.propTypes = {
  album: PropTypes.objectOf(PropTypes.any).isRequired,
  media: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
export default EntryList;
