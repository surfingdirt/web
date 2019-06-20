/* eslint-disable no-console */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Header, { headerTypes } from 'Components/Header';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

export const cardTypes = headerTypes;

const Card = ({ children, className, title, type }) => {
  return (
    <section className={classnames(className, styles.wrapper)}>
      <div className={styles.content}>{children}</div>
      {title && (
        <Header className={styles.title} type={type}>
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

    if (!cardTypes.includes(type)) {
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
