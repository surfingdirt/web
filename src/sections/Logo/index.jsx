import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SVG from 'Components/SVG';
import LogoImage from 'Images/logo-regular.svg';

import styles from './styles.scss';

class Logo extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    const { title } = this.props;
    return (
      <Fragment>
        <SVG className={styles.logoImage} icon={LogoImage} label="" hollow />
        <h1 className={styles.title}>{title}</h1>
      </Fragment>
    );
  }
}

export default Logo;
