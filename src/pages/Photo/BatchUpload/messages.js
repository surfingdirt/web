const messages = (getText, getPlural) => (key) =>
  ({
    postingToAlbum: getText(
      'Posting to album',
      'Batch upload page',
    ) /* Names the album the user is posting many photos to */,
    batchPhotoUpload: getText(
      'Batch photo upload',
      'Batch upload page',
    ) /* Title of the photo post page */,
  }[key]);

export default messages;
