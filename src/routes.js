const routes = {
  ABOUT: '/about',
  ALBUM: '/album/:id',
  ALBUM_EDIT: '/edit-album/:id',
  ALBUM_NEW: '/new-album',
  ALBUMS: '/albums',
  COMMENT_EDIT: '/edit-comment/:id',
  CONTACT: '/contact',
  CONFIRM_EMAIL: '/confirm-email',
  DISCOVER: '/discover',
  ERROR: '/error/:id/:message',
  FEED: '/feed',
  LOST_PASSWORD: '/lost-password',
  HOME: '/',
  LOGIN: '/signin',
  LOGIN_OAUTH: '/signin-oauth',
  NEW_PASSWORD_ACTIVATED: '/new-password-activated',
  OLD_FORUM: '/old-forum',
  PHOTO: '/photo/:id',
  PHOTO_BATCH_UPLOAD_FOR_ALBUM: '/album/:id/multi-upload',
  PHOTO_EDIT: '/edit-photo/:id',
  PHOTO_NEW: '/new-photo',
  PHOTO_NEW_FOR_ALBUM: '/album/:id/new-photo',
  PROFILE: '/profile',
  REGISTRATION: '/registration',
  SETTINGS: '/settings',
  VIDEO: '/video/:id',
  VIDEO_EDIT: '/edit-video/:id',
  VIDEO_NEW: '/new-video',
  VIDEO_NEW_FOR_ALBUM: '/album/:id/new-video',
  USER: '/rider/:id',
  USERS: '/riders',
};
export default routes;
