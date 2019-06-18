import PropTypes from 'prop-types';
import React from 'react';

import Actions from 'Sections/Actions';
import Footer from 'Sections/Footer';
import Main from 'Sections/Main';
import Navigation from 'Sections/Navigation';
import Masthead from 'Sections/Masthead';

import styles from './styles.scss';

const Index = ({ children }) => (
  <div className={styles.wrapper}>
    <Masthead className={styles.masthead} />
    <Navigation className={styles.navigation} />
    <Footer className={styles.footer} />
    <Actions className={styles.actions} />
    <Main className={styles.main}>{children}</Main>
  </div>
);

Index.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Index;
