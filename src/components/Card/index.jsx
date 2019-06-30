/* eslint-disable no-console */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Header, { headerTypes } from 'Components/Header';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const HERO = 'hero';
const FREE = 'free';
const FLOW = 'flow';

export const cardTypes = {
  HERO,
  FREE,
  FLOW,
};

const { PRIMARY } = headerTypes;

const Card = ({ children, className, title, type }) => {
  return (
    <section className={classnames(className, styles.wrapper)}>
      <div className={styles.content}>{children}</div>
      {title && (
        <Header className={styles.title} type={PRIMARY}>
          {title}
        </Header>
      )}
    </section>
  );
};

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
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
  title: null,
};

export default Translate(messages)(Card);
