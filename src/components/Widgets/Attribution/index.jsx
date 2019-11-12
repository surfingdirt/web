import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Userbox from 'Components/User/Userbox';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const Attribution = ({ className, short, submitter, t, userboxSize }) => {
  const by = short ? t('by') : t('startedBy');
  return (
    <div className={classnames(styles.wrapper, className)}>
      <span className={classnames(styles.by, { [styles.short]: short })}>{by}</span>
      <Userbox user={submitter} size={userboxSize} />
    </div>
  );
};

Attribution.propTypes = {
  className: PropTypes.string,
  short: PropTypes.bool,
  submitter: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
  userboxSize: PropTypes.string.isRequired,
};

Attribution.defaultProps = {
  className: null,
  short: true,
};

export default Translate(messages)(Attribution);
