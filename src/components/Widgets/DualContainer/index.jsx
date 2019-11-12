import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.scss';

const DualContainer = ({ children, nowrap }) => (
  <div className={classnames(styles.container, { [styles.nowrap]: nowrap })}>{children}</div>
);

DualContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  nowrap: PropTypes.bool,
};

DualContainer.defaultProps = {
  nowrap: false,
};

export default DualContainer;
