import classnames from 'classnames';
import { InlineSpinner } from 'Components/Widgets/Spinner';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

const ACTION = 'action';
const BARE = 'bare';
const DISABLED = 'disabled';
const MAIN = 'main';
const NEGATIVE = 'negative';

export const buttonTypes = { ACTION, BARE, DISABLED, MAIN, NEGATIVE, };

const typeMapping = {
  [ACTION]: 'actionButton',
  [BARE]: 'bareButton',
  [DISABLED]: 'disabledButton',
  [MAIN]: 'mainButton',
  [NEGATIVE]: 'negativeButton',
};

const DEFAULT = 'default';
const LARGE = 'large';
const SMALL = 'small';

export const buttonSizes = { DEFAULT, LARGE, SMALL, };

const sizeMapping = {
  [DEFAULT]: 'defaultSize',
  [LARGE]: 'largeSize',
  [SMALL]: 'smallSize',
};

const Button = ({
  className,
  label,
  disabled,
  loading,
  onClick,
  type,
  href,
  targetBlank,
  buttonType,
  size,
}) => {
  let actualElement;
  let elementClassName;

  /* Content */
  let content;
  if (loading) {
    content = <InlineSpinner negative={type === NEGATIVE} className={styles.spinner} />;
  } else {
    content = <span className={styles.label}>{label}</span>;
  }

  /* Containing element */
  if (href) {
    elementClassName = styles.linkElement;
    const attrs = { to: href };
    if (targetBlank) {
      attrs.target = '_blank';
    }
    actualElement = <Link {...attrs}>{content}</Link>;
  } else {
    elementClassName = styles.buttonElement;
    actualElement = <button type={buttonType}>{content}</button>;
  }

  /* Styles */
  const typeClassName = typeMapping[type];
  const sizeClassName = sizeMapping[size];
  const actualClassName = classnames(
    styles.button,
    elementClassName,
    styles[typeClassName],
    styles[sizeClassName],
    disabled ? styles.disabled : null,
    loading ? styles.loading : null,
    className,
  );
  return React.cloneElement(actualElement, { className: actualClassName, disabled, onClick });
};

Button.propTypes = {
  /* Common props */
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  type: (props, propName, componentName) => {
    const type = props[propName];
    if (!type) {
      return new Error(`Empty type set for component '${componentName}'`);
    }

    if (!Object.keys(typeMapping).includes(type)) {
      return new Error(`Invalid type set for component '${componentName}': '${type}'`);
    }

    return undefined;
  },
  size: (props, propName, componentName) => {
    const size = props[propName];
    if (!size) {
      return new Error(`Empty size set for component '${componentName}'`);
    }

    if (!Object.keys(sizeMapping).includes(size)) {
      return new Error(`Invalid size set for component '${componentName}': '${size}'`);
    }

    return undefined;
  },

  /* <button> props */
  buttonType: PropTypes.string,

  /* <a> element props */
  href: PropTypes.string,
  targetBlank: PropTypes.bool,

  /* Modifiers */
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  type: MAIN,
  size: DEFAULT,
  onClick: () => {},
  iconLeft: null,
  iconRight: null,

  buttonType: 'button',

  href: null,
  targetBlank: false,

  disabled: false,
  loading: false,
};

export default Button;
