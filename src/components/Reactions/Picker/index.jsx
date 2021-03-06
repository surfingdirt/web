import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { ORDERED_REACTIONS, TYPE_TO_CODEPOINT } from 'Components/Reactions/Reaction';
import Emoji from 'Components/Widgets/Emoji';
import Translate from 'Hocs/Translate';
import { ReactionType } from 'Utils/types';

import styles from './styles.scss';
import messages from '../messages';

const ReactionsPicker = ({ className, onReaction, pickerRef, reactions, t }) => {
  return (
    <div
      aria-label={t('reactions')}
      role="dialog"
      tabIndex="0"
      ref={pickerRef}
      className={classnames(styles.wrapper, className)}
    >
      {ORDERED_REACTIONS.map((type) => {
        const currentReaction = reactions.find((r) => r.type === type);
        const active = !!currentReaction && currentReaction.userReactionId;
        return (
          <button
            title={t(type)}
            type="button"
            data-type={type}
            key={type}
            onClick={onReaction}
            className={classnames(styles.reaction, { [styles.active]: active })}
          >
            <Emoji codepoint={TYPE_TO_CODEPOINT[type]} className={styles.emoji} />
          </button>
        );
      })}
    </div>
  );
};

ReactionsPicker.displayName = 'ReactionsPicker';

ReactionsPicker.propTypes = {
  className: PropTypes.string,
  onReaction: PropTypes.func.isRequired,
  reactions: PropTypes.arrayOf(ReactionType).isRequired,
  t: PropTypes.func.isRequired,
};

ReactionsPicker.defaultProps = { className: null };
export default Translate(messages)(ReactionsPicker);
