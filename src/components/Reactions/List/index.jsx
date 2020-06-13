import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate';
import { ReactionType } from 'Utils/types';

import styles from './styles.scss';
import messages from '../messages';
import Reaction from '../Reaction';

const ReactionsList = ({ className, reactions, t }) => {
  const total = reactions.reduce((acc, r) => acc + r.count, 0);
  return (
    <div className={classnames(styles.wrapper, className)}>
      <ul className={styles.reactionsList} aria-hidden="true">
        {reactions.map(({ type }) => (
          <Reaction key={type} type={type} />
        ))}
      </ul>
      <p className={styles.count} aria-label={`${t('reactionCount')}: ${total}`}>
        {total}
      </p>
    </div>
  );
};
ReactionsList.propTypes = {
  className: PropTypes.string,
  reactions: PropTypes.arrayOf(ReactionType).isRequired,
  t: PropTypes.func.isRequired,
};
ReactionsList.defaultProps = { className: null };
export default Translate(messages)(ReactionsList);
