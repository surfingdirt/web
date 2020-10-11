/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import Translate from 'Hocs/Translate';

import Aside from './Aside';
import Feed from './Feed';
import messages from './messages';
import styles from './styles.scss';

const Home = ({ t }) => {
  return (
    <>
      <Helmet>
        <title>Surfing Dirt</title>
      </Helmet>
      <div className={styles.wrapper}>
        <Feed className={styles.feed} />
        <Aside className={styles.aside} />
      </div>
    </>
  );
};

Home.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Home);
