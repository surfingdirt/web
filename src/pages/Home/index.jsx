/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import ResponsiveLayout from 'Components/Widgets/ResponsiveLayout';
import Translate from 'Hocs/Translate';

import Aside from './Aside';
import Feed from './Feed';
import messages from './messages';
import styles from './styles.scss';

const Home = ({ t }) => {
  const childrenData = [
    [t('activity'), <Feed className={styles.feed} />],
    ['News', <Aside className={styles.aside} />],
  ];

  return (
    <>
      <Helmet>
        <title>Surfing Dirt</title>
      </Helmet>
      <ResponsiveLayout
        ariaLabel={t('tabsLabel')}
        className={styles.wrapper}
        childrenData={childrenData}
      />
    </>
  );
};

Home.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Home);
