import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import ALBUMS from 'Apollo/queries/listAlbums3.gql';
import AlbumPreview from 'Components/Album/AlbumPreview';
import MoreAlbums from 'Components/Album/MoreAlbums';
import Empty from 'Components/Empty';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const ALBUM_COUNT_ON_ALBUMS_PAGE = 5;
const ALBUM_PAGINATION_SIZE = 5;
const ALBUM_ITEM_COUNT = 5;

const AlbumsRaw = ({ t }) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const { galleryAlbumId } = useContext(AppContext);

  const { data, error, fetchMore, loading } = useQuery(ALBUMS, {
    variables: {
      count: ALBUM_COUNT_ON_ALBUMS_PAGE,
      countItems: ALBUM_ITEM_COUNT,
      skipAlbums: [galleryAlbumId],
    },
  });

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage />;

  const { listAlbums: albums } = data;

  if (albums.length === 0) {
    return <Empty />;
  }

  return (
    <div className={styles.wrapper}>
      {albums.map((album) => (
        <AlbumPreview album={album} key={album.id} showAttribution />
      ))}
      <div className={styles.moreAlbumsWrapper}>
        {reachedEnd ? (
          <p className={styles.endReached}>{t('endReached')}</p>
        ) : (
          <MoreAlbums
            loading={loadingMore}
            onClick={() => {
              setLoadingMore(true);
              fetchMore({
                variables: {
                  start: albums.length,
                  count: ALBUM_PAGINATION_SIZE,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  setLoadingMore(false);

                  if (!fetchMoreResult) {
                    return prev;
                  }

                  if (fetchMoreResult.listAlbums.length === 0) {
                    setReachedEnd(true);
                    return prev;
                  }

                  return Object.assign({}, prev, {
                    listAlbums: [...prev.listAlbums, ...fetchMoreResult.listAlbums],
                  });
                },
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

AlbumsRaw.propTypes = {
  t: PropTypes.func.isRequired,
};

export const Albums = Translate(messages)(AlbumsRaw);
