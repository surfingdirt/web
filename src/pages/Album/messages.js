const messages = (getText, getPlural) => (key) =>
  ({
    batchUpload: getText(
      'Post multiple photos',
      'Album page',
    ) /* Label for a menu item to add many photos to an album */,
  }[key]);

export default messages;
