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

const BottomBarActionButton = ({ className, icon, label, to }) => (
  <button to={to} className={classnames(className, styles.wrapper)}>
    {icon}
  </button>
);

BottomBarActionButton.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string,
};

BottomBarActionButton.defaultProps = {
  active: false,
  className: null,
  icon: null,
  onClick: null,
  to: null,
};

export default BottomBarActionButton;
