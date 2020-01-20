const messages = (getText, getPlural) => (key) =>
  ({
    postingToAlbum: getText('Posting to album') /* Names the album the user is posting to */,
    batchPhotoUpload: getText(
      'Post multiple photos',
      'Multiple upload page',
    ) /* Title of the photo post page */,
  }[key]);

export default messages;
