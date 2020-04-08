/* eslint-disable import/prefer-default-export */
import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import Tabs from 'Components/Widgets/Tabs';
import TabPanel from 'Components/Widgets/Tabs/TabPanel';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';

import Discover from './Discover';
import Feed from './Feed';
import messages from './messages';
import styles from './styles.scss';

const Home = ({ t }) => {
  const {
    login: {
      data: {
        me: { username },
      },
    },
  } = useContext(AppContext);

  const loggedIn = !!username;

  return (
    <Fragment>
      <Helmet>
        <title>Surfing Dirt</title>
      </Helmet>
      <Tabs ariaLabel={t('tabsLabel')} url="" reverseTabOrder={loggedIn}>
        <TabPanel label={t('discover')} id="discover" defaultTab={!loggedIn}>
          <Discover />
        </TabPanel>
        <TabPanel label={t('feed')} id="feed" defaultTab={loggedIn}>
          <Feed />
        </TabPanel>
      </Tabs>
    </Fragment>
  );
};

Home.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Home);
