import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SVG from 'Components/SVG/index';
import LogoImage from 'Images/logo-regular.svg';

import styles from './styles.scss';

const HEADER_HORIZONTAL = 'header-horizontal';
const BIG_VERTICAL = 'big-vertical';
export const logoTypes = {
  HEADER_HORIZONTAL,
  BIG_VERTICAL,
};

const classMapping = {
  [HEADER_HORIZONTAL]: [null, null],
  [BIG_VERTICAL]: [styles.bigLogo, styles.bigTitle],
};

const Logo = ({ title, type }) => {
  const [imageClassName, titleClassName] = classMapping[type];

  return (
    <Fragment>
      <SVG
        className={classnames(styles.logoImage, imageClassName)}
        icon={LogoImage}
        presentationOnly
        hollow
      />
      <div className={classnames(styles.title, titleClassName)}>{title}</div>
    </Fragment>
  );
};

Logo.propTypes = {
  title: PropTypes.string.isRequired,
  type: (props, propName, componentName) => {
    const type = props[propName];
    if (!type) {
      return new Error(`Empty type set for component '${componentName}'`);
    }

    if (!Object.values(logoTypes).includes(type)) {
      return new Error(`Invalid type set for component '${componentName}': '${type}'`);
    }

    return undefined;
  },
};

export default Logo;
