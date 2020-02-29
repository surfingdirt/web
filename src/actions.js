export const ACTION_PREFIX = '/actions';

const actions = {
  ACTIVATE_NEW_PASSWORD: '/activate-new-password',
  ALBUM_NEW: '/album/post',
  AVATAR_UPDATE: '/avatar/post',
  COMMENT_DELETE: '/comment/delete',
  COMMENT_NEW_ALBUM: '/comment/post/album',
  COMMENT_NEW_PHOTO: '/comment/post/photo',
  COMMENT_NEW_VIDEO: '/comment/post/video',
  COMMENT_UPDATE: '/comment/update',
  COVER_UPDATE: '/cover/post',
  FORGOT_PASSWORD: '/forgot-password',
  LOGIN: '/signIn',
  LOGOUT: '/logout',
  PHOTO_BATCH_UPLOAD: '/photo/batch-upload',
  PHOTO_EDIT: '/photo/edit',
  PHOTO_NEW: '/photo/post',
  SETTINGS: '/settings',
  VIDEO_EDIT: '/video/edit',
  VIDEO_NEW: '/video/post',
  USER_NEW: '/user/post',
  USER_UPDATE: '/user/update',
};

export default actions;
