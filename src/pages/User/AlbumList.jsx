import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import USER_ALBUMS from 'Apollo/queries/userAlbums2.gql';
import AlbumPreview from 'Components/Album/AlbumPreview';
import Spinner from 'Components/Widgets/Spinner';
import ErrorMessage from 'Components/Widgets/ErrorMessage';

const AlbumList = ({ userId }) => {
  const { data, error, loading } = useQuery(USER_ALBUMS, { variables: { userId } });

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage />;

  const { listAlbums } = data;

  return listAlbums.map((album) => <AlbumPreview album={album} key={album.id} />);
};

AlbumList.PropTypes = {
  userId: PropTypes.string.isRequired,
};

export default AlbumList;
