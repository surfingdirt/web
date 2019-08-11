import classnames from 'classnames';
import { InlineSpinner } from 'Components/Spinner';
import SVG from 'Components/SVG';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

const MAIN = 'main';
const NEGATIVE = 'negative';
const DISABLED = 'disabled';
const LARGE = 'large';

export const buttonTypes = { MAIN, NEGATIVE, DISABLED, LARGE };

const typeMapping = {
  [MAIN]: 'mainButton',
  [NEGATIVE]: 'negativeButton',
  [DISABLED]: 'disabledButton',
  [LARGE]: 'largeButton',
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
  iconLeft,
  iconRight,
}) => {
  const hasIcon = iconLeft || iconRight;

  let actualElement;
  let elementClassName;

  /* Content */
  let content;
  if (loading) {
    content = <InlineSpinner className={styles.spinner} />;
  } else {
    const labelMarkup = <span className={styles.label}>{label}</span>;
    if (hasIcon) {
      content = (
        <div className={styles.contentWrapper}>
          {iconLeft && <SVG icon={iconLeft} className={classnames(styles.icon, styles.iconLeft)} />}
          {labelMarkup}
          {iconRight && (
            <SVG icon={iconRight} className={classnames(styles.icon, styles.iconRight)} />
          )}
        </div>
      );
    } else {
      content = labelMarkup;
    }
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
  const actualClassName = classnames(
    styles.button,
    elementClassName,
    styles[typeClassName],
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
  type: 'main',
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
