/* eslint-disable import/prefer-default-export */
import React from 'react';

import FEED from 'Apollo/queries/feed.gql';
import Feed from 'Components/Feed';
import DataRenderer from 'Components/Widgets/DataRenderer';

const FeedWrapper = () => (
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

export default FeedWrapper;
