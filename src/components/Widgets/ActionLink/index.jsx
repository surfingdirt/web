import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getIcon } from 'Utils/icons';

import styles from './styles.scss';

const ActionLink = ({ className, icon, iconClassName, label, to }) => (
  <Link to={to} className={classnames(className, styles.wrapper)} title={label}>
    {getIcon({ type: icon, label, className: classnames(styles.defaultIcon, iconClassName) })}
    <span className={styles.label} aria-hidden="true">
      {label}
    </span>
  </Link>
);

ActionLink.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  iconClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

ActionLink.defaultProps = {
  className: null,
  icon: null,
  iconClassName: null,
};

export default ActionLink;
