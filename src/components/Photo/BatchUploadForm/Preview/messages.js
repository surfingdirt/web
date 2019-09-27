const messages = (getText, getPlural) => (key) =>
  ({
    failed: getText('Upload failed') /* Indicates a given image failed to upload */,
    filename: getText('File') /* Label for a file name */,
    imageError: getText('Invalid image') /* Indicates an image could not be read */,
    open: getText('Open') /* Label for a link to open a page */,
    waiting: getText('Waiting') /* Indicates an image will start uploading soon */,
  }[key]);

export default messages;
