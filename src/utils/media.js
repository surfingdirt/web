export const maxPhotoSize = 1920;

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

export const getFirstAlbumImageUrl = (items) => {
  if (!items || items.length === 0) {
    return null;
  }

  return getBiggestMediaImageUrl(items[0]);
};
