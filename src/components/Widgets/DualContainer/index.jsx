import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.scss';

const DualContainer = ({ children, className, nowrap }) => (
  <div className={classnames(styles.container, { [styles.nowrap]: nowrap }, className)}>
    {children}
  </div>
);

DualContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  nowrap: PropTypes.bool,
};

DualContainer.defaultProps = {
  className: null,
  nowrap: false,
};

export default DualContainer;
