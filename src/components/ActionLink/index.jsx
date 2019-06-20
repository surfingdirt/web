import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Album from 'Images/picture-stack-landscape-bold.svg';
import Photo from 'Images/camera-bold.svg';
import Video from 'Images/go-pro-bold.svg';
import SVG from 'Components/SVG';
import icons from 'Utils/icons';

import styles from './styles.scss';

const getIcon = (type, label) => {
  switch (type) {
    case icons.ALBUM:
      return <SVG icon={Album} hollow label={label} className={classnames(styles.defaultIcon)} />;

    case icons.PHOTO:
      return <SVG icon={Photo} hollow label={label} className={classnames(styles.defaultIcon)} />;

    case icons.VIDEO:
      return <SVG icon={Video} hollow label={label} className={classnames(styles.defaultIcon)} />;

    default:
      throw new Error(`Unsupported action link type '${type}'`);
  }
};

const ActionLink = ({ className, icon, label, to }) => (
  <Link to={to} className={classnames(className, styles.wrapper)}>
    {getIcon(icon, label)}
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
