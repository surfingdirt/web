import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Reaction, { TYPE_TO_CODEPOINT } from 'Components/Reactions/Reaction';
import ReactionsPicker from 'Components/Reactions/Picker';
import Emoji from 'Components/Widgets/Emoji';
import { types } from 'Components/Widgets/SvgSymbols';
import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';
import sizes from 'Utils/iconSizes';
import { ReactionType } from 'Utils/types';

import styles from './styles.scss';
import messages from '../messages';

const { LIKE_OUTLINE } = types;

const MAX_RENDERED_USER_REACTIONS = 3;

// TODO: create a new type of button for item metadata actions and use it here, for commenting, and for sharing

const ReactionsTrigger = ({
  className,
  onPickerReaction,
  onReaction,
  parentId,
  parentType,
  reactions,
  t,
}) => {
  const userReactions = reactions.filter((r) => !!r.userReactionId);
  const active = userReactions.length > 0;

  const pickerButtonId = `picker_${parentType}_${parentId.substr(0, 5)}`;

  let content;
  if (userReactions.length === 0) {
    const codepoint = LIKE_OUTLINE;
    content = (
      <>
        <span className={styles.reaction}>
          <Emoji codepoint={codepoint} className={styles.emoji} />
        </span>
        <span className={styles.label}>{t('defaultReaction')}</span>
      </>
    );
  } else if (userReactions.length === 1) {
    const reactionType = userReactions[0].type;
    content = (
      <>
        <Reaction tagName="span" type={reactionType} className={styles.reaction} />
        <span className={styles.label}>{t(reactionType)}</span>
      </>
    );
  } else {
    const useEllipsis = userReactions.length > MAX_RENDERED_USER_REACTIONS;
    const max = useEllipsis ? MAX_RENDERED_USER_REACTIONS - 1 : MAX_RENDERED_USER_REACTIONS;
    const reactionEls = userReactions
      .slice(0, max)
      .map(({ type }) => <Reaction key={type} type={type} className={styles.reaction} />);
    content = (
      <>
        <ul className={styles.reactionsList} aria-hidden="true">
          {reactionEls}
        </ul>
        {useEllipsis && <span className={styles.ellipsis}>...</span>}
      </>
    );
  }

  return (
    <div className={styles.positioner}>
      <div className={classnames(styles.wrapper, className, { [styles.active]: active })}>
        <button type="button" aria-pressed={active} onClick={onReaction} className={styles.button}>
          {content}
        </button>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label className={styles.arrow} htmlFor={pickerButtonId} role="button">
          {getIcon({
            presentationOnly: true,
            size: sizes.TINY,
            type: icons.ARROW_DOWN,
          })}
        </label>
      </div>
      <input
        id={pickerButtonId}
        className={styles.pickerButton}
        type="checkbox"
        role="button"
        hidden
      />
      <ReactionsPicker
        className={styles.picker}
        onReaction={onPickerReaction}
        reactions={reactions}
      />
    </div>
  );
};

ReactionsTrigger.propTypes = {
  className: PropTypes.string,
  onPickerReaction: PropTypes.func.isRequired,
  onReaction: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired,
  parentType: PropTypes.string.isRequired,
  reactions: PropTypes.arrayOf(ReactionType).isRequired,
  t: PropTypes.func.isRequired,
};

ReactionsTrigger.defaultProps = { className: null };

export default Translate(messages)(ReactionsTrigger);
