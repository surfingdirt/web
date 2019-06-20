import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Album from 'Images/picture-stack-landscape.svg';
import Hot from 'Images/trends-hot-flame.svg';
import Users from 'Images/single-neutral-id-card-double.svg';
import SVG from 'Components/SVG';
import icons from 'Utils/icons';

import styles from './styles.scss';

const getIcon = (type) => {
  switch (type) {
    case icons.ALBUM:
      return <SVG icon={Album} label="" className={classnames(styles.defaultIcon)} />;

    case icons.HOT:
      return <SVG icon={Hot} label="" className={classnames(styles.defaultIcon)} />;

    case icons.USERS:
      return <SVG icon={Users} label="" className={classnames(styles.defaultIcon)} />;

    default:
      return null;
  }
};

const NavigationLink = ({ className, icon, label, to }) => {
  return (
    <Link to={to} className={classnames(className, styles.wrapper)}>
      <span>{getIcon(icon)}</span>
      <span>{label}</span>
    </Link>
  );
};

NavigationLink.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

NavigationLink.defaultProps = {
  className: null,
  icon: null,
};

export default NavigationLink;
