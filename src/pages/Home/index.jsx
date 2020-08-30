/* eslint-disable import/prefer-default-export */
import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import FourDownHomeSection from 'Components/FourDown/HomeSection';
import Tabs from 'Components/Widgets/Tabs';
import TabPanel from 'Components/Widgets/Tabs/TabPanel';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';

import Discover from './Discover';
import DiscoverHeader from './Discover/Header';
import Feed from './Feed';
import FeedHeader from './Feed/Header';
import messages from './messages';

const Home = ({ t }) => {
  const {
    features: { fourDown },
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
      {fourDown && <FourDownHomeSection />}
      <Tabs ariaLabel={t('tabsLabel')} url="" reverseTabOrder={loggedIn}>
        <TabPanel
          label={t('discover')}
          id="discover"
          defaultTab={!loggedIn}
          header={<DiscoverHeader />}
          bareHeader
        >
          <Discover />
        </TabPanel>
        <TabPanel label={t('activity')} id="feed" defaultTab={loggedIn} header={<FeedHeader />}>
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
