import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import ALBUMS from 'Apollo/queries/listAlbums2.gql';
import AlbumPreview from 'Components/Album/AlbumPreview';
import MoreAlbums from 'Components/Album/MoreAlbums';
import Empty from 'Components/Empty';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';
import { AlbumConstants } from 'Utils/data';

import messages from './messages';
import styles from './styles.scss';

const { INITIAL_ALBUM_COUNT, SUBSEQUENT_ALBUM_COUNT, ITEM_COUNT } = AlbumConstants.ALBUMS;

const AlbumsRaw = ({ t }) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const { galleryAlbumId } = useContext(AppContext);

  const { data, error, fetchMore, loading } = useQuery(ALBUMS, {
    variables: {
      count: INITIAL_ALBUM_COUNT,
      countItems: ITEM_COUNT,
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
            label={t('moreAlbums')}
            loading={loadingMore}
            onClick={() => {
              setLoadingMore(true);
              fetchMore({
                variables: {
                  start: albums.length,
                  count: SUBSEQUENT_ALBUM_COUNT,
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
