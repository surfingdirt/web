import querystring from 'querystring';
import qs from 'qs';

import routes from '~/routes';
import { ACTION_PREFIX } from '~/actions';

const {
  ALBUM,
  ERROR,
  USER,
  PHOTO,
  PHOTO_BATCH_UPLOAD_FOR_ALBUM,
  PHOTO_EDIT,
  PHOTO_NEW_FOR_ALBUM,
  REGISTRATION,
  SETTINGS,
  VIDEO_NEW_FOR_ALBUM,
  VIDEO,
  VIDEO_EDIT,
} = routes;

const ID_REGEXP = new RegExp(':id');
const MESSAGE_REGEXP = new RegExp(':message');

export const actionRoute = (name) => `${ACTION_PREFIX}${name}`;

export const albumRoute = (id) => ALBUM.replace(ID_REGEXP, id);

export const batchPhotoUploadForAlbumRoute = (id) =>
  PHOTO_BATCH_UPLOAD_FOR_ALBUM.replace(ID_REGEXP, id);

export const errorRoute = (code, message = '', queryArgs) => {
  let result = ERROR.replace(ID_REGEXP, code).replace(MESSAGE_REGEXP, querystring.escape(message));
  if (queryArgs) {
    result = `${result}?${qs.stringify(queryArgs)}`;
  }
  return result;
};

export const newPhotoForAlbumRoute = (id) => PHOTO_NEW_FOR_ALBUM.replace(ID_REGEXP, id);

export const newVideoForAlbumRoute = (id) => VIDEO_NEW_FOR_ALBUM.replace(ID_REGEXP, id);

export const editPhotoRoute = (id) => PHOTO_EDIT.replace(ID_REGEXP, id);
export const photoRoute = (id) => PHOTO.replace(ID_REGEXP, id);

export const registrationRoute = (errors, values) =>
  `${REGISTRATION}?${qs.stringify({ errors, values })}`;

export const settingsSaveSucessRoute = () => `${SETTINGS}?success=1`;

export const editVideoRoute = (id) => VIDEO_EDIT.replace(ID_REGEXP, id);
export const videoRoute = (id) => VIDEO.replace(ID_REGEXP, id);

export const userRoute = (id) => USER.replace(ID_REGEXP, id);
