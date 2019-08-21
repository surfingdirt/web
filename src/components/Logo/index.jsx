import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SVG from 'Components/SVG/index';
import LogoImage from 'Images/logo-regular.svg';

import styles from './styles.scss';

const HEADER_HORIZONTAL = 'header-horizontal';
const BIG_VERTICAL = 'big-vertical';
const NO_TEXT = 'no-text';

export const logoTypes = {
  BIG_VERTICAL,
  HEADER_HORIZONTAL,
  NO_TEXT,
};

const classMapping = {
  [BIG_VERTICAL]: [styles.bigLogo, styles.bigTitle],
  [NO_TEXT]: [null, styles.titleHidden],
  [HEADER_HORIZONTAL]: [null, null],
};

const Logo = ({ className, title, type }) => {
  const [imageClassName, titleClassName] = classMapping[type];

  return (
    <Fragment>
      <SVG
        className={classnames(styles.logoImage, imageClassName, className)}
        icon={LogoImage}
        presentationOnly
        hollow
      />
      <div className={classnames(styles.title, titleClassName)}>{title}</div>
    </Fragment>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
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

Logo.defaultProps = {
  className: null,
};

export default Logo;
