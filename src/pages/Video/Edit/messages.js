const messages = (getText, getPlural) => (key) =>
  ({
    inAlbum: getText('In album') /* Names the album containing the current media item */,
    videoEditPage: getText('Edit a video', 'Video edit page') /* Title of the video edition page */,
  }[key]);

export default messages;
