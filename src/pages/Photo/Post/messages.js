const messages = (getText, getPlural) => (key) =>
  ({
    postingToAlbum: getText('Posting to album') /* Names the album the user is posting to */,
    photoPostPage: getText(
      'Post a new photo',
      'Photo post page',
    ) /* Title of the photo post page */,
  }[key]);

export default messages;
