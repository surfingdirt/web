import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Translate from 'Hocs/Translate';

import messages from './messages';

import styles from './styles.scss';

const Main = ({ children, className }) => (
  <main className={classnames(styles.wrapper, className)}>{children}</main>
);

Main.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Translate(messages)(Main);
