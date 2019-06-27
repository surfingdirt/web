import React from 'react';
import PropTypes from 'prop-types';

import SVG from 'Components/SVG';
import Activity from 'Images/alarm-bell.svg';
import Album from 'Images/picture-stack-landscape-bold.svg';
import Close from 'Images/close.svg';
import Hot from 'Images/trends-hot-flame.svg';
import Photo from 'Images/camera-bold.svg';
import Video from 'Images/go-pro-bold.svg';
import ThreeDots from 'Images/navigation-menu-horizontal.svg';
import Profile from 'Images/single-neutral-circle-alternate-bold.svg';
import Search from 'Images/search-alternate-bold.svg';
import Users from 'Images/single-neutral-id-card-double.svg';

const ACTIVITY = 'activity';
const ALBUM = 'album';
const CLOSE = 'close';
const HOT = 'hot';
const PHOTO = 'photo';
const PROFILE = 'profile';
const SEARCH = 'search';
const THREEDOTS = 'threedots';
const USERS = 'users';
const VIDEO = 'video';

const icons = {
  ACTIVITY,
  ALBUM,
  CLOSE,
  HOT,
  PHOTO,
  PROFILE,
  SEARCH,
  THREEDOTS,
  USERS,
  VIDEO,
};

export default icons;

export const getIcon = ({
  type,
  label,
  className,
  standardIcon = false,
  presentationOnly = false,
}) => {
  let hollow = true;
  let icon = null;

  switch (type) {
    case icons.ACTIVITY:
      icon = Activity;
      break;
    case icons.ALBUM:
      icon = Album;
      break;
    case icons.CLOSE:
      icon = Close;
      break;
    case icons.HOT:
      icon = Hot;
      break;
    case icons.PHOTO:
      icon = Photo;
      break;
    case icons.PROFILE:
      icon = Profile;
      break;
    case icons.SEARCH:
      icon = Search;
      break;
    case icons.THREEDOTS:
      icon = ThreeDots;
      break;
    case icons.USERS:
      hollow = false;
      icon = Users;
      break;
    case icons.VIDEO:
      icon = Video;
      break;
    default:
      throw new Error(`Unsupported action link type '${type}'`);
  }
  const props = { className, hollow, icon, label, presentationOnly, standardIcon };
  return <SVG {...props} />;
};

getIcon.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  presentationOnly: PropTypes.bool,
  standardIcon: PropTypes.bool,
};

getIcon.defaultProps = {
  className: null,
  label: null,
  presentationOnly: false,
  standardIcon: false,
};
