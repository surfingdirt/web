import React from 'react';
import PropTypes from 'prop-types';

import Emoji from 'Components/Widgets/Emoji';
import Translate from 'Hocs/Translate';
import { ReactionType } from 'Utils/types';

import styles from './styles.scss';
import messages from '../messages';

/*
  Name, emoji, code point (@see https://github.com/twitter/twemoji)
  [
    ['angry', '😡', '1f621'],
    ['cool', '😎', '1f60e'],
    ['fire', '🔥', '1f525'],
    ['injured', '🤕', '1f915'],
    ['impressed', '😮', '1f62e'],
    ['like', '👍', '1f44d'],
    ['laughing', '🤣', '1f923'],
    ['sad', '😢', '1f622'],
  ]
 */
const TYPE_TO_EMOJI = {
  angry: '😡',
  cool: '😎',
  fire: '🔥',
  injured: '🤕',
  impressed: '😮',
  like: '👍',
  laughing: '🤣',
  sad: '😢',
};
const TYPE_TO_CODEPOINT = {
  angry: '1f621',
  cool: '1f60e',
  fire: '1f525',
  injured: '1f915',
  impressed: '1f62e',
  like: '1f44d',
  laughing: '1f923',
  sad: '1f622',
};
const renderReaction = (key, type, className, t) => (
  <li key={key} className={className}>
    <Emoji label={t(type)} codepoint={TYPE_TO_CODEPOINT[type]} className={styles.emoji} />
  </li>
);
const ReactionsList = ({ reactions, short, t }) => {
  return (
    <div aria-label={t('reactions')} className={styles.wrapper}>
      <ul className={styles.reactionsList}>
        {reactions.map(({ type }) => renderReaction(type, type, styles.reaction, t))}
      </ul>
      <p className={styles.count} aria-label={t('')}>
        {reactions.reduce((acc, r) => acc + r.count, 0)}
      </p>
    </div>
  );
};
ReactionsList.propTypes = {
  short: PropTypes.bool,
  reactions: PropTypes.arrayOf(ReactionType).isRequired,
};
ReactionsList.defaultProps = { short: false };
export default Translate(messages)(ReactionsList);
