import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Logo from 'Components/Logo';
import routes from '~/routes';
import contexts from '~/contexts';

import styles from './styles.scss';

const { HOME } = routes;
const { AppContext } = contexts;

const Masthead = ({}, context) => {
  const { title } = context;

  return (
    <header className={styles.wrapper}>
      <Link to={HOME} className={styles.logoLink}>
        <Logo title={title} />
      </Link>
    </header>
  );
};

Masthead.contextType = AppContext;

Masthead.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Masthead;
