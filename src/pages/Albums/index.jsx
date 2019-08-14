import React from 'react';
import { Query } from 'react-apollo';

import ALBUMS from 'Apollo/queries/listAlbums.gql';
import AlbumPreview from 'Components/AlbumPreview';
import Card, { cardTypes } from 'Components/Card';
import Empty from 'Components/Empty';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';

const { STANDARD } = cardTypes;

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
        <Card title={album.title} type={STANDARD} key={album.id}>
          <AlbumPreview album={album} />
        </Card>
      ));
    }}
  </Query>
);
