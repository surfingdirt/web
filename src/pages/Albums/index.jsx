import React from 'react';
import { Query } from 'react-apollo';

import ALBUMS from 'Apollo/queries/listAlbums2.gql';
import AlbumPreview from 'Components/AlbumPreview';
import Empty from 'Components/Empty';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';

export const Albums = () => (
  <Query query={ALBUMS}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return <ErrorMessage />;

      const { listAlbums: albums } = data;

      if (albums.length === 0) {
        return <Empty />;
      }

      return albums.map((album) => (
        <AlbumPreview album={album} key={album.id} showAttribution />
      ));
    }}
  </Query>
);
