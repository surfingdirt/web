export const ACTION_PREFIX = '/actions';

const actions = {
  ALBUM_NEW: '/album/post',
  AVATAR_UPDATE: '/avatar/post',
  COMMENT_DELETE: '/comment/delete',
  COMMENT_NEW_ALBUM: '/comment/post/album',
  COMMENT_NEW_PHOTO: '/comment/post/photo',
  COMMENT_NEW_VIDEO: '/comment/post/video',
  COMMENT_UPDATE: '/comment/update',
  COVER_UPDATE: '/cover/post',
  LOGIN: '/login',
  LOGOUT: '/logout',
  PHOTO_BATCH_UPLOAD: '/photo/batch-upload',
  PHOTO_NEW: '/photo/post',
  VIDEO_NEW: '/video/post',
  USER_UPDATE: '/user/update',
};

export default actions;
