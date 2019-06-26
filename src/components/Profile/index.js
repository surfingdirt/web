import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import NamedIcon from 'Components/NamedIcon';
import icons, { getIcon } from 'Utils/icons';

import styles from './styles.scss';

const { PROFILE } = icons;

const Profile = ({ className, name, to }) => {
  return (
    <Link to={to} className={classnames(className, styles.wrapper)}>
      <NamedIcon
        label={name}
        icon={getIcon({ type: PROFILE, presentationOnly: true, standardIcon: true })}
      />
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
