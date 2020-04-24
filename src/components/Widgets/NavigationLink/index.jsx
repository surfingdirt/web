import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getIcon } from 'Utils/icons';

import styles from './styles.scss';

const NavigationLink = ({
  active,
  className,
  icon,
  label,
  negative,
  onClick,
  role,
  tag,
  to,
  type,
}) => {
  const classNames = classnames(className, styles.wrapper, {
    [styles.active]: active,
    [styles.negative]: negative,
  });

  const Tag = tag || Link;
  const attrs = { onClick, type, to };
  if (role) {
    attrs.role = role;
  }

  return (
    <Tag className={classNames} {...attrs}>
      {icon && <span className={styles.defaultIcon}>{getIcon({ type: icon })}</span>}
      <span className={styles.label}>{label}</span>
    </Tag>
  );
};

NavigationLink.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  negative: PropTypes.bool,
  onClick: PropTypes.func,
  role: PropTypes.string,
  tag: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string,
};

NavigationLink.defaultProps = {
  active: false,
  className: null,
  icon: null,
  negative: false,
  onClick: null,
  role: null,
  tag: null,
  to: null,
  type: null,
};

export default NavigationLink;
