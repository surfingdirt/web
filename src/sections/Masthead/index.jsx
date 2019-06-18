import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Logo from 'Components/Logo';
import routes from '~/routes';
import contexts from '~/contexts';

import styles from './styles.scss';

const { HOME } = routes;
const { AppContext } = contexts;

const Masthead = ({ className }, { title }) => (
  <header className={classnames(styles.wrapper, className)}>
    <Link to={HOME} className={styles.logoLink}>
      <Logo title={title} />
    </Link>
  </header>
);

Masthead.propTypes = {
  className: PropTypes.string.isRequired,
};

Masthead.contextType = AppContext;

export default Masthead;
