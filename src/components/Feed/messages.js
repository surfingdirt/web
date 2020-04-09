const messages = (getText, getPlural) => (key) =>
  ({
    reply: getText('Reply', 'Comments') /* Label for a button to post a comment */,

    newAlbum: getText('New album', 'Feed') /* Indicates a new album was created */,
    newComment: getText('New comment', 'Feed') /* Indicates a new comment was posted */,
    newPhoto: getText('New photo', 'Feed') /* Indicates a new photo was posted */,
    newVideo: getText('New video', 'Feed') /* Indicates a new video was posted */,
    newUser: getText('New rider', 'Feed') /* Indicates a new user registered */,

    newComments: (count) =>
      getPlural(
        '%d new comment',
        '%d new comments',
        count,
        'Feed',
      ) /* Indicates how many new comments were posted */,
    newPhotos: (count) =>
      getPlural(
        '%d new photo',
        '%d new photos',
        count,
        'Feed',
      ) /* Indicates how many new photos were posted */,
    newVideos: (count) =>
      getPlural(
        '%d new video',
        '%d new videos',
        count,
        'Feed',
      ) /* Indicates how many new videos were posted */,

    addedTo: getText(
      'added to',
      'Feed',
    ) /* Indicates what item a comment or photo was added to. Example: 9 new photos added to 'My Album' */,
  }[key]);
export default messages;
