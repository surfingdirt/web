import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Emoji from 'Components/Widgets/Emoji';
import Translate from 'Hocs/Translate';

import styles from './styles.scss';
import messages from '../messages';

export const ORDERED_REACTIONS = [
  'like',
  'fire',
  'cool',
  'laughing',
  'impressed',
  'injured',
  'sad',
  'angry',
];
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
export const TYPE_TO_CODEPOINT = {
  angry: '1f621',
  cool: '1f60e',
  fire: '1f525',
  injured: '1f915',
  impressed: '1f62e',
  like: '1f44d',
  laughing: '1f923',
  sad: '1f622',
};
export const TYPE_TO_LABEL_COLOR_CLASSNAME = {
  angry: styles.labelColor1,
  cool: styles.labelColor0,
  fire: styles.labelColor2,
  injured: styles.labelColor0,
  impressed: styles.labelColor0,
  like: styles.labelColor0,
  laughing: styles.labelColor0,
  sad: styles.labelColor0,
};
export const DEFAULT_REACTION = 'like';
const Reaction = ({ className, t, tagName, type }) => {
  const Tag = tagName;
  return (
    <Tag className={classnames(styles.reaction, className)}>
      <Emoji label={t(type)} codepoint={TYPE_TO_CODEPOINT[type]} className={styles.emoji} />
    </Tag>
  );
};
Reaction.propTypes = {
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
  tagName: PropTypes.string,
  type: PropTypes.string.isRequired,
};
Reaction.defaultProps = { className: null, tagName: 'li' };
export default Translate(messages)(Reaction);
