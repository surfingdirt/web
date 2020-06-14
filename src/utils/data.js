export const AlbumContributions = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
};

export const AlbumVisibility = {
  PRIVATE: 'PRIVATE',
  UNLISTED: 'UNLISTED',
  VISIBLE: 'VISIBLE',
};

const homeAlbumCount = 5;
export const AlbumConstants = {
  HOME: {
    ALBUM_COUNT: homeAlbumCount,
    ITEM_COUNT: 5,
  },
  ALBUMS: {
    INITIAL_ALBUM_COUNT: homeAlbumCount + 3,
    SUBSEQUENT_ALBUM_COUNT: 5,
    ITEM_COUNT: 5,
  },
};

export const ItemTypes = {
  COMMENT: 'comment',
};
