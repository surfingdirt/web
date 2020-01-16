import React from 'react';
import PropTypes from 'prop-types';

import SVG from 'Components/Widgets/SVG';
import Activity from 'Images/alarm-bell.svg';
import Album from 'Images/picture-stack-landscape-bold.svg';
import ArrowDown from 'Images/arrow-down.svg';
import Close from 'Images/close.svg';
import Check from 'Images/check.svg';
import Expand from 'Images/expand-6.svg';
import Home from 'Images/home.svg';
import Hot from 'Images/trends-hot-flame.svg';
import Photo from 'Images/camera-bold.svg';
import Next from 'Images/arrow-right.svg';
import Previous from 'Images/arrow-left.svg';
import Profile from 'Images/single-neutral-circle-alternate-bold.svg';
import Search from 'Images/search-alternate-bold.svg';
import ThreeDotsHorizontal from 'Images/navigation-menu-horizontal.svg';
import ThreeDotsVertical from 'Images/navigation-menu-vertical.svg';
import Users from 'Images/single-neutral-id-card-double.svg';
import Video from 'Images/video-player-movie.svg';
// import Close from 'Images/remove-circle-regular.svg';

const ACTIVITY = 'activity';
const ALBUM = 'album';
const ARROW_DOWN = 'arrow-down';
const CLOSE = 'close';
const CHECK = 'check';
const EXPAND = 'expand';
const HOME = 'home';
const HOT = 'hot';
const NEXT = 'next';
const PHOTO = 'photo';
const PREVIOUS = 'previous';
const PROFILE = 'profile';
const SEARCH = 'search';
const THREEDOTS_HORIZONTAL = 'threedots-horizontal';
const THREEDOTS_VERTICAL = 'threedots-vertical';
const USERS = 'users';
const VIDEO = 'video';

const icons = {
  ACTIVITY,
  ALBUM,
  ARROW_DOWN,
  CLOSE,
  CHECK,
  EXPAND,
  HOME,
  HOT,
  NEXT,
  PHOTO,
  PREVIOUS,
  PROFILE,
  SEARCH,
  THREEDOTS_HORIZONTAL,
  THREEDOTS_VERTICAL,
  USERS,
  VIDEO,
};
export default icons;

const SMALL = 'small';
const STANDARD = 'standard';
const TINY = 'tiny';
export const sizes = {
  SMALL,
  STANDARD,
  TINY,
};

export const getIcon = ({ type, label, className, size, presentationOnly }) => {
  let hollow = true;
  let icon = null;

  switch (type) {
    case icons.ACTIVITY:
      icon = Activity;
      break;
    case icons.ALBUM:
      icon = Album;
      break;
    case icons.ARROW_DOWN:
      icon = ArrowDown;
      break;
    case icons.CLOSE:
      icon = Close;
      break;
    case icons.CHECK:
      icon = Check;
      break;
    case icons.HOME:
      hollow = false;
      icon = Home;
      break;
    case icons.HOT:
      icon = Hot;
      break;
    case icons.EXPAND:
      hollow = false;
      icon = Expand;
      break;
    case icons.NEXT:
      icon = Next;
      break;
    case icons.PHOTO:
      icon = Photo;
      break;
    case icons.PREVIOUS:
      icon = Previous;
      break;
    case icons.PROFILE:
      icon = Profile;
      break;
    case icons.SEARCH:
      icon = Search;
      break;
    case icons.THREEDOTS_HORIZONTAL:
      icon = ThreeDotsHorizontal;
      break;
    case icons.THREEDOTS_VERTICAL:
      icon = ThreeDotsVertical;
      break;
    case icons.USERS:
      icon = Users;
      break;
    case icons.VIDEO:
      icon = Video;
      break;
    default:
      throw new Error(`Unsupported icon type '${type}'`);
  }
  const props = { className, hollow, icon, label, presentationOnly, size };
  return <SVG {...props} />;
};

getIcon.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  presentationOnly: PropTypes.bool,
  size: PropTypes.string,
};

getIcon.defaultProps = {
  className: null,
  label: null,
  presentationOnly: false,
  size: STANDARD,
};
