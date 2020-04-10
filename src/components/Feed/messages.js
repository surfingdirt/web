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
        '1 new comment',
        '123 new comments',
        count,
        'Feed',
      ) /* Indicates how many new comments were posted */,
    newPhotos: (count) =>
      getPlural(
        '1 new photo',
        '123 new photos',
        count,
        'Feed',
      ) /* Indicates how many new photos were posted */,
    newVideos: (count) =>
      getPlural(
        '1 new video',
        '123 new videos',
        count,
        'Feed',
      ) /* Indicates how many new videos were posted */,

    addedTo: getText(
      'in',
      'Feed',
    ) /* Indicates what item a comment or photo was added to. Example: 9 new photos in 'My Album' */,
  }[key]);
export default messages;
