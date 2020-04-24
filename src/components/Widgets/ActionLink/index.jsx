import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getIcon } from 'Utils/icons';

import styles from './styles.scss';

const ActionLink = ({ className, icon, iconClassName, label, role, to }) => (
  <Link to={to} className={classnames(className, styles.wrapper)} title={label} role={role}>
    {getIcon({
      type: icon,
      className: classnames(styles.defaultIcon, iconClassName),
      presentationOnly: true,
    })}
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
  role: PropTypes.string,
  to: PropTypes.string.isRequired,
};

ActionLink.defaultProps = {
  className: null,
  icon: null,
  iconClassName: null,
  role: null,
};

export default ActionLink;
