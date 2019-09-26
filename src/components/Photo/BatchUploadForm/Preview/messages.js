const messages = (getText, getPlural) => (key) =>
  ({
    filename: getText('File') /* Label for a file name */,
    imageError: getText('Invalid image') /* Indicates an image could not be read */,
  }[key]);

export default messages;
