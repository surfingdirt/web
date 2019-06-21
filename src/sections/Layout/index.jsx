import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import Actions from 'Sections/Actions';
import Footer from 'Sections/Footer';
import Main from 'Sections/Main';
import Navigation from 'Sections/Navigation';
import Masthead from 'Sections/Masthead';

import styles from './styles.scss';

const Layout = ({ children, match: { url } }) => (
  <div className={styles.wrapper}>
    <Masthead className={styles.masthead} />
    <Navigation className={styles.navigation} url={url} />
    <Footer className={styles.footer} />
    <Actions className={styles.actions} />
    <Main className={styles.main}>{children}</Main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withRouter(Layout);
