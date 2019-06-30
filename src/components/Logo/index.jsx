import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SVG from 'Components/SVG/index';
import LogoImage from 'Images/logo-regular.svg';

import styles from './styles.scss';

const Logo = ({ title }) => {
  return (
    <Fragment>
      <SVG className={styles.logoImage} icon={LogoImage} presentationOnly hollow />
      <div className={styles.title}>{title}</div>
    </Fragment>
  );
};

Logo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Logo;
