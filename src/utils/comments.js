import { albumRoute, photoRoute, videoRoute } from 'Utils/links';

const NEUTRAL = 'neutral';
const JOKING = 'joking';
const ANGRY = 'angry';
const HAPPY = 'happy';
const SAD = 'sad';

export const tones = {
  NEUTRAL,
  JOKING,
  ANGRY,
  HAPPY,
  SAD,
};

const ALBUM = 'album';
const PHOTO = 'photo';
const VIDEO = 'video';

export const parentTypes = {
  ALBUM,
  PHOTO,
  VIDEO,
};

export const getParentRoute = (type, id) => {
  let route;
  switch (type) {
    case ALBUM:
      route = albumRoute(id);
      break;
    case PHOTO:
      route = photoRoute(id);
      break;
    case VIDEO:
      route = videoRoute(id);
      break;
    default:
      throw new Error(`Comment parent route building not handled for parent type '${type}'`);
  }
  return route;
};
