import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './style.scss';

export default class Section extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    label: '',
  };

  render() {
    const { children, className, label, ...rest } = this.props;

    return (
      <section className={classnames(className, styles.section)} {...rest}>
        <h2 className={styles.title}>{label}</h2>
        {children}
      </section>
    );
  }
}
