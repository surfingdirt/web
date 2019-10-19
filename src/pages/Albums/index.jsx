import React from 'react';
import { Query } from 'react-apollo';

import ALBUMS from 'Apollo/queries/listAlbums.gql';
import AlbumPreview from 'Components/Album/AlbumPreview';
import MoreAlbums from 'Components/Album/MoreAlbums';
import Empty from 'Components/Empty';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';

const ALBUM_COUNT_ON_ALBUMS_PAGE = 2;
const ALBUM_ITEM_COUNT = 5;

export const Albums = () => (
  <Query
    query={ALBUMS}
    variables={{ count: ALBUM_COUNT_ON_ALBUMS_PAGE, countItems: ALBUM_ITEM_COUNT }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return <ErrorMessage />;

      const { listAlbums: albums } = data;

      if (albums.length === 0) {
        return <Empty />;
      }


      return albums.map((album) => <AlbumPreview album={album} key={album.id} showAttribution />);
    }}
  </Query>
);
