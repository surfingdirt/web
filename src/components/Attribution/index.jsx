import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Userbox from 'Components/User/Userbox';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const Attribution = ({ short, submitter, t, userboxSize }) => {
  const by = short ? t('by') : t('startedBy');
  return (
    <div className={styles.wrapper}>
      <span className={classnames(styles.by, { [styles.short]: short })}>{by}</span>
      <Userbox user={submitter} size={userboxSize} />
    </div>
  );
};

Attribution.propTypes = {
  short: PropTypes.bool.isRequired,
  submitter: PropTypes.objectOf({}).isRequired,
  t: PropTypes.func.isRequired,
  userboxSize: PropTypes.string.isRequired,
};

Attribution.defaultProps = {
  short: true,
};

export default Translate(messages)(Attribution);
