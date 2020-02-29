const messages = (getText, getPlural) => (key) =>
  ({
    inAlbum: getText('In album') /* Names the album containing the current media item */,
    photoEditPage: getText('Edit a photo', 'Photo edit page') /* Title of the photo edition page */,
  }[key]);

export default messages;
