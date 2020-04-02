const messages = (getText, getPlural) => (key) =>
  ({
    newAlbum: getText('New album', 'Feed') /* Indicates a new album was created */,
    newComment: getText('New comment', 'Feed') /* Indicates a new comment was created */,
    newPhoto: getText('New photo', 'Feed') /* Indicates a new photo was created */,
    newVideo: getText('New video', 'Feed') /* Indicates a new video was created */,
    newUser: getText('New rider', 'Feed') /* Indicates a new user registered */,
  }[key]);

export default messages;
