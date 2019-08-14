/* eslint-disable no-console */

import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import classnames from 'classnames';

import Heading, { headingTypes } from 'Components/Heading/index';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const BARE = 'bare';
const HERO = 'hero';
const STANDARD = 'standard';

export const cardTypes = {
  BARE,
  HERO,
  STANDARD,
};

const classMapping = {
  [BARE]: null,
  [HERO]: null,
  [STANDARD]: null,
};

const { PRIMARY } = headingTypes;

const renderContent = (props) => {
  const { children, headingType, heroContent, title, titleLink, type } = props;
  switch (type) {
    case BARE:
      return children;
    case HERO:
      return (
        <Fragment>
          <div className={styles.heroContent}>{heroContent}</div>
          <div className={styles.contentWrapper}>
            <Heading className={styles.title} type={headingType} link={titleLink}>
              {title}
            </Heading>
            {children}
          </div>
        </Fragment>
      );
    case STANDARD:
      return (
        <div className={styles.contentWrapper}>
          <Heading className={styles.title} type={headingType} link={titleLink}>
            {title}
          </Heading>
          <div className={styles.content}>{children}</div>
        </div>
      );
    default:
      throw new Error(`Unsupported card type '${type}'`);
  }
};

const Card = (props) => {
  const { className, negative, type } = props;
  const actualClassName = classnames(
    styles.wrapper,
    classMapping[type],
    { [styles.negative]: negative },
    className,
  );

  return <section className={actualClassName}>{renderContent(props)}</section>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  headingType: PropTypes.string,
  heroContent: PropTypes.node,
  negative: PropTypes.bool,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
  titleLink: PropTypes.string,
  type: (props, propName, componentName) => {
    const type = props[propName];
    if (!type) {
      return new Error(`Empty type set for component '${componentName}'`);
    }

    if (!Object.values(cardTypes).includes(type)) {
      return new Error(`Invalid type set for component '${componentName}': '${type}'`);
    }

    return undefined;
  },
};

Card.defaultProps = {
  className: null,
  headingType: PRIMARY,
  heroContent: null,
  negative: false,
  title: null,
  titleLink: null,
};

export default Translate(messages)(Card);
