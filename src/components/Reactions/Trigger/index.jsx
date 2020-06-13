import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { TYPE_TO_CODEPOINT } from 'Components/Reactions/List';
import Emoji from 'Components/Widgets/Emoji';
import { types } from 'Components/Widgets/SvgSymbols';
import Translate from 'Hocs/Translate';
import { ReactionType } from 'Utils/types';

import styles from './styles.scss';
import messages from '../messages';

const { LIKE_OUTLINE } = types;

// TODO: create a new type of button for item metadata actions and use it here, for commenting, and for sharing

const ReactionsTrigger = ({ className, onReaction, t, reactions }) => {
  const userReactions = reactions.filter((r) => !!r.userReactionId);
  const active = userReactions.length > 0;

  let codepoint;
  if (userReactions.length === 0) {
    codepoint = LIKE_OUTLINE;
  } else if (userReactions.length === 1) {
    const reactionType = userReactions[0].type;
    codepoint = TYPE_TO_CODEPOINT[reactionType];
  }

  return (
    <div className={classnames(styles.wrapper, className, { [styles.active]: active })}>
      <button type="button" aria-pressed={active} onClick={onReaction} className={styles.button}>
        <Emoji codepoint={codepoint} className={styles.emoji} />
        <span className={styles.label}>{t('trigger')}</span>
      </button>
      <input type="checkbox" role="button" />
    </div>
  );
};

ReactionsTrigger.propTypes = {
  className: PropTypes.string,
  onReaction: PropTypes.func.isRequired,
  reactions: PropTypes.arrayOf(ReactionType).isRequired,
  t: PropTypes.func.isRequired,
};

ReactionsTrigger.defaultProps = { className: null };

export default Translate(messages)(ReactionsTrigger);
