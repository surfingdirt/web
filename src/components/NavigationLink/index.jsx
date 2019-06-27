import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getIcon } from 'Utils/icons';

import styles from './styles.scss';

const NavigationLink = ({ active, className, icon, label, to }) => {
  return (
    <Link to={to} className={classnames(className, styles.wrapper, { [styles.active]: active })}>
      <span className={styles.defaultIcon}>{getIcon({ type: icon })}</span>
      <span>{label}</span>
    </Link>
  );
};

NavigationLink.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

NavigationLink.defaultProps = {
  active: false,
  className: null,
  icon: null,
};

export default NavigationLink;
