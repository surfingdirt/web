import HOME from 'Apollo/queries/home.gql';
import { AlbumConstants } from 'Utils/data';
import LIST_MEDIA from 'Apollo/queries/listMedia.gql';

const { ALBUM_COUNT, ITEM_COUNT } = AlbumConstants.HOME;

export const maxPhotoSize = 1920;

export const mediaPageSize = 30;

export const mediaTypes = {
  PHOTO: 'PHOTO',
  VIDEO: 'VIDEO',
};

export const mediaSizes = {
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
};

export const MEDIA_SUBTYPE_IMG = 'IMG';

export const MEDIA_SUBTYPES_VIDEO = {
  DAILYMOTION: 'dailymotion',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  VIMEO: 'vimeo',
  YOUTUBE: 'youtube',
};

export const MAX_MEDIA_PREVIEW_COUNT = 5;

export const getBiggestMediaImageUrl = (media) => {
  if (!media) {
    return null;
  }

  const srcs = media.images || media.thumbs;

  const image = srcs.find((i) => {
    return i.size === mediaSizes.LARGE;
  });

  if (!image || !image.url) {
    return null;
  }

  return image.url;
};

export const getFirstAlbumImageUrls = (items) => {
  if (!items || items.length === 0) {
    return null;
  }

  return items.slice(0, MAX_MEDIA_PREVIEW_COUNT).map((i) => getBiggestMediaImageUrl(i));
};

// This update is for the case where a user visits the homepage and then posts a photo.
export const updateHomeQueryAfterMediaUpload = (cache, newItem, albumId, galleryAlbumId) => {
  const queryOptions = {
    query: HOME,
    variables: {
      galleryAlbumId,
      count: ALBUM_COUNT,
      countItems: ITEM_COUNT,
      skipAlbums: [galleryAlbumId],
    },
  };
  let data;
  try {
    data = cache.readQuery(queryOptions);
  } catch {
    return;
  }
  if (!data) {
    return;
  }
  const { album, listAlbums } = data;
  if (album.id === albumId) {
    const newAlbum = Object.assign({}, album, {
      media: [newItem].concat(album.media).slice(0, ITEM_COUNT),
      itemCount: album.itemCount + 1,
    });
    cache.writeQuery(
      Object.assign({}, queryOptions, {
        data: { listAlbums, album: newAlbum },
      }),
    );
  } else {
    let index = null;
    listAlbums.forEach(({ id }, i) => {
      if (id === albumId) {
        index = i;
      }
    });
    if (index !== null) {
      const albumToUpdate = listAlbums[index];
      const newListAlbums = Object.assign({}, listAlbums);
      newListAlbums[index] = Object.assign({}, albumToUpdate, {
        media: [newItem].concat(albumToUpdate.media).slice(0, ITEM_COUNT),
        itemCount: albumToUpdate.itemCount + 1,
      });
      cache.writeQuery(
        Object.assign({}, queryOptions, {
          data: { listAlbums: newListAlbums, album },
        }),
      );
    }
  }
};

// This update is for the case where a user visits an album page and then posts a photo.
export const updateAlbumQueryAfterMediaUpload = (cache, newItem, albumId) => {
  const queryOptions = {
    query: LIST_MEDIA,
    variables: {
      albumId,
      countItems: mediaPageSize,
      startItem: 0,
    },
  };
  const data = cache.readQuery(queryOptions);
  if (!data) {
    return;
  }
  const { listMedia } = data;
  cache.writeQuery(
    Object.assign({}, queryOptions, {
      data: { listMedia: [newItem].concat(listMedia).slice(0, mediaPageSize) },
    }),
  );
};
