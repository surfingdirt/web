import querystring from 'querystring';

import routes from '~/routes';
import { ACTION_PREFIX } from '~/actions';

const { ALBUM, ERROR, USER, PHOTO, PHOTO_BATCH_UPLOAD_FOR_ALBUM, PHOTO_NEW_FOR_ALBUM, VIDEO_NEW_FOR_ALBUM, VIDEO } = routes;

const ID_REGEXP = new RegExp(':id');
const MESSAGE_REGEXP = new RegExp(':message');

export const albumRoute = (id) => ALBUM.replace(ID_REGEXP, id);

export const batchPhotoUploadForAlbumRoute = (id) => PHOTO_BATCH_UPLOAD_FOR_ALBUM.replace(ID_REGEXP, id);

export const newPhotoForAlbumRoute = (id) => PHOTO_NEW_FOR_ALBUM.replace(ID_REGEXP, id);

export const newVideoForAlbumRoute = (id) => VIDEO_NEW_FOR_ALBUM.replace(ID_REGEXP, id);

export const errorRoute = (code, message = '') =>
  ERROR.replace(ID_REGEXP, code).replace(MESSAGE_REGEXP, querystring.escape(message));

export const photoRoute = (id) => PHOTO.replace(ID_REGEXP, id);

export const videoRoute = (id) => VIDEO.replace(ID_REGEXP, id);

export const userRoute = (id) => USER.replace(ID_REGEXP, id);

export const actionRoute = (name) => `${ACTION_PREFIX}${name}`;
