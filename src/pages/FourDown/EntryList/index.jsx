import React from 'react';
import PropTypes from 'prop-types';

import EntryItem from './EntryItem';
import styles from './styles.scss';

const EntryList = ({ album, onVoteClick, media, voteInProgress }) => {
  const hasVoted = media.some(({ selected }) => !!selected);

  const items = media.map((item) => {
    const attrs = { album, hasVoted, item, onVoteClick, media, voteInProgress };
    return (
      <li className={styles.item} key={item.id}>
        <EntryItem {...attrs} />
      </li>
    );
  });

  return <ul className={styles.list}>{items}</ul>;
};
EntryList.propTypes = {
  album: PropTypes.objectOf(PropTypes.any).isRequired,
  media: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onVoteClick: PropTypes.func.isRequired,
  voteInProgress: PropTypes.string.isRequired,
};
export default EntryList;
