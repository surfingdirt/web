import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { ORDERED_REACTIONS, TYPE_TO_CODEPOINT } from 'Components/Reactions/List';
import Emoji from 'Components/Widgets/Emoji';
import Translate from 'Hocs/Translate';

import styles from './styles.scss';
import messages from '../messages';

const ReactionsPicker = ({ className, onReaction, t }) => (
  <div
    aria-label={t('reactions')}
    role="dialog"
    tabIndex="0"
    className={classnames(styles.wrapper, className)}
  >
    {ORDERED_REACTIONS.map((type) => (
      <button
        aria-label={t(type)}
        type="button"
        data-type={type}
        key={type}
        onClick={onReaction}
        className={styles.reaction}
      >
        <Emoji codepoint={TYPE_TO_CODEPOINT[type]} className={styles.emoji} />
      </button>
    ))}
  </div>
);

ReactionsPicker.propTypes = {
  className: PropTypes.string,
  onReaction: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};
ReactionsPicker.defaultProps = { className: null };
export default Translate(messages)(ReactionsPicker);
