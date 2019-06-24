import React from 'react';

import Album from 'Images/picture-stack-landscape-bold.svg';
import Close from 'Images/close.svg';
import Photo from 'Images/camera-bold.svg';
import Video from 'Images/go-pro-bold.svg';
import SVG from 'Components/SVG';

const ALBUM = 'album';
const CLOSE = 'close';
const HOT = 'hot';
const PHOTO = 'photo';
const USERS = 'users';
const VIDEO = 'video';

const icons = {
  ALBUM,
  CLOSE,
  HOT,
  PHOTO,
  USERS,
  VIDEO,
};

export const getIcon = (type, label, className) => {
  switch (type) {
    case icons.ALBUM:
      return <SVG icon={Album} hollow label={label} className={className} />;

    case icons.CLOSE:
      return <SVG icon={Close} hollow label={label} className={className} />;

    case icons.PHOTO:
      return <SVG icon={Photo} hollow label={label} className={className} />;

    case icons.VIDEO:
      return <SVG icon={Video} hollow label={label} className={className} />;

    default:
      throw new Error(`Unsupported action link type '${type}'`);
  }
};

export default icons;
