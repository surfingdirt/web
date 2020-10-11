/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';

import FEED from 'Apollo/queries/feed.gql';
import Feed from 'Components/Feed';
import DataRenderer from 'Components/Widgets/DataRenderer';

const FeedWrapper = ({ className }) => (
  <DataRenderer
    query={FEED}
    render={(data) => {
      const {
        getPublicFeed: { feedEntries },
      } = data;
      return <Feed className={className} entries={feedEntries} />;
    }}
  />
);

FeedWrapper.propTypes = {
  className: PropTypes.string,
};

FeedWrapper.defaultProps = {
  className: null,
};

export default FeedWrapper;
