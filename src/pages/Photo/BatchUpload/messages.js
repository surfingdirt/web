const messages = (getText, getPlural) => (key) =>
  ({
    postingToAlbum: getText(
      'Posting to album',
      'Multiple upload page',
    ) /* Names the album the user is posting many photos to */,
    batchPhotoUpload: getText(
      'Post multiple photos',
      'Multiple upload page',
    ) /* Title of the photo post page */,
  }[key]);

export default messages;
