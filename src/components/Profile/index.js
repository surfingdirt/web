import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import SVG from 'Components/SVG';
import ProfileIcon from 'Images/single-neutral-circle.svg';

import styles from './styles.scss';

const Profile = ({ className, name, to }) => {
  return (
    <Link to={to} className={classnames(className, styles.wrapper)}>
      <SVG icon={ProfileIcon} label={name} standardIcon />
    </Link>
  );
};

Profile.propTypes = {
  /* Common props */
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

Profile.defaultProps = {
  className: null,
};

export default Profile;
