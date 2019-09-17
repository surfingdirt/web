const messages = (getText, getPlural) => (key) =>
  ({
    batchUpload: getText(
      'Batch photo upload',
      'Album page',
    ) /* Label for a menu item to add many photos to an album */,
  }[key]);

export default messages;
