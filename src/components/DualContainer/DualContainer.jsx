import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.scss';

const DualContainer = ({ children }) => <div className={styles.container}>{children}</div>;

DualContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default DualContainer;
