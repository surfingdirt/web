const messages = (getText, getPlural) => (key) =>
  ({
    createAnAlbum: getText(
      'Create an album',
      'Actions',
    ) /* Label of a link to a page where a user could create a new album */,
    postAPhoto: getText(
      'Post a photo',
      'Actions',
    ) /* Label of a link to a page where a user could add a new photo */,
    postAVideo: getText(
      'Post a video',
      'Actions',
    ) /* Label of a link to a page where a user could add a new video */,
  }[key]);

export default messages;
