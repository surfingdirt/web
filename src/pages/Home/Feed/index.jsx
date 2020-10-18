import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import FEED from 'Apollo/queries/feed2.gql';
import Feed from 'Components/Feed';

import Empty from 'Components/Widgets/Empty';
import ErrorMessage from 'Components/Widgets/ErrorMessage';
import Spinner from 'Components/Widgets/Spinner';
import Translate from 'Hocs/Translate';
import { FeedConstants } from 'Utils/data';

import MoreFeedPages from './MoreFeedPages';
import messages from './messages';
import styles from './styles.scss';

const { PAGE_SIZE, INITIAL_OFFSET } = FeedConstants;

const FeedWrapper = ({ className, t }) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [pageOffset, setPageOffset] = useState(PAGE_SIZE);

  const { data, error, fetchMore, loading } = useQuery(FEED, {
    variables: {
      count: PAGE_SIZE,
      offset: INITIAL_OFFSET,
    },
  });

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage />;

  const {
    getPublicFeed: { feedEntries },
  } = data;

  if (feedEntries.length === 0) {
    return <Empty />;
  }

  return (
    <div className={styles.wrapper}>
      <Feed className={className} entries={feedEntries} />
      <div className={styles.moreAlbumsWrapper}>
        {reachedEnd ? (
          <p className={styles.endReached}>{t('endReached')}</p>
        ) : (
          <MoreFeedPages
            buttonLabel={t('moreFeedPages')}
            loading={loadingMore}
            onClick={() => {
              setLoadingMore(true);
              fetchMore({
                variables: {
                  count: PAGE_SIZE,
                  offset: pageOffset,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  setLoadingMore(false);
                  if (!fetchMoreResult) {
                    return prev;
                  }

                  setPageOffset(fetchMoreResult.getPublicFeed.nextOffset);

                  if (fetchMoreResult.getPublicFeed.feedEntries.length === 0) {
                    setReachedEnd(true);
                    return prev;
                  }

                  const merged = Object.assign({}, prev, {
                    getPublicFeed: {
                      // eslint-disable-next-line no-underscore-dangle
                      __typename: prev.getPublicFeed.__typename,
                      feedEntries: [
                        ...prev.getPublicFeed.feedEntries,
                        ...fetchMoreResult.getPublicFeed.feedEntries,
                      ],
                      nextOffset: fetchMoreResult.getPublicFeed.nextOffset,
                    },
                  });

                  return merged;
                },
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

FeedWrapper.propTypes = {
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
};

FeedWrapper.defaultProps = {
  className: null,
};

export default Translate(messages)(FeedWrapper);
