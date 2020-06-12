import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Emoji from 'Components/Widgets/Emoji';
import { types } from 'Components/Widgets/SvgSymbols';
import Translate from 'Hocs/Translate';

import styles from './styles.scss';
import messages from '../messages';

const { LIKE_OUTLINE } = types;

const ReactionsTrigger = ({ className, t }) => (
  <button type="button" className={classnames(styles.wrapper, className)}>
    <Emoji codepoint={LIKE_OUTLINE} className={styles.emoji} />
    <span className={styles.label}>{t('trigger')}</span>
  </button>
);
ReactionsTrigger.propTypes = {
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
};
ReactionsTrigger.defaultProps = { className: null };

export default Translate(messages)(ReactionsTrigger);
