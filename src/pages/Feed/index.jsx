/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import FEED from 'Apollo/queries/feed.gql';
import Feed from 'Components/Feed';
import DataRenderer from 'Components/Widgets/DataRenderer';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

class Home extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;

    return (
      <DataRenderer
        query={FEED}
        render={(data) => {
          const {
            getPublicFeed: { from, until, feedEntries },
          } = data;
          return <Feed entries={feedEntries} />;
        }}
      />
    );
  }
}

export default Translate(messages)(Home);
