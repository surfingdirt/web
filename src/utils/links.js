import routes from '~/routes';
import { ACTION_PREFIX } from '~/actions';

const { ALBUM, USER, PHOTO, VIDEO } = routes;

const ID_REGEXP = new RegExp(':id');

export const albumRoute = (id) => ALBUM.replace(ID_REGEXP, id);

export const photoRoute = (id) => PHOTO.replace(ID_REGEXP, id);

export const videoRoute = (id) => VIDEO.replace(ID_REGEXP, id);

export const userRoute = (id) => USER.replace(ID_REGEXP, id);

export const actionRoute = (name) => `${ACTION_PREFIX}${name}`;
