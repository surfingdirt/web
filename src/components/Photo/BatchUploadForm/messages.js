const messages = (getText, getPlural) => (key) =>
  ({
    upload: getText('Upload') /* Label for a button to upload a picture */,
  }[key]);

export default messages;
