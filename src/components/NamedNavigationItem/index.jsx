import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const NamedNavigationItem = ({ label, visual }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.visual}>{visual}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

NamedNavigationItem.propTypes = {
  visual: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

NamedNavigationItem.defaultProps = {};

export default NamedNavigationItem;
