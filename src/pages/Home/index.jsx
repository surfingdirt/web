/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import Card, { cardTypes } from 'Components/Widgets/Card';
import ResponsiveLayout from 'Components/Widgets/ResponsiveLayout';
import Translate from 'Hocs/Translate';

import AppContext from '~/contexts';

import Aside from './Aside';
import DiscoverHeader from './Discover/Header';
import Feed from './Feed';
import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;

const Home = ({ t }) => {
  const {
    login: {
      data: {
        me: { username },
      },
    },
  } = useContext(AppContext);

  const feed = <Feed className={styles.feed} />;
  const centralColumn = username ? (
    feed
  ) : (
    <div>
      <Card
        type={STANDARD}
        className={styles.discoverHeader}
        contentClassName={styles.discoverHeaderContent}
      >
        <DiscoverHeader />
      </Card>
      {feed}
    </div>
  );

  const childrenData = [
    [t('activity'), centralColumn],
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
