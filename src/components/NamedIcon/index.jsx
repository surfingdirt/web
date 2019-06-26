import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const NamedIcon = ({ label, icon }) => {
  return (
    <div className={styles.wrapper}>
      {icon}
      <span className={styles.label}>{label}</span>
    </div>
  );
};

NamedIcon.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

NamedIcon.defaultProps = {};

export default NamedIcon;
