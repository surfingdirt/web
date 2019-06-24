import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getIcon } from 'Utils/icons';

import styles from './styles.scss';

const ActionLink = ({ className, icon, label, to }) => (
  <Link to={to} className={classnames(className, styles.wrapper)}>
    {getIcon(icon, label, styles.defaultIcon)}
  </Link>
);

ActionLink.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

ActionLink.defaultProps = {
  className: null,
  icon: null,
};

export default ActionLink;
