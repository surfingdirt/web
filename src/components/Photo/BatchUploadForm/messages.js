const messages = (getText, getPlural) => (key) =>
  ({
    clear: getText('Clear') /* Label for a button to clear a list of photos */,
    instructions: getText('Click here to choose photos') /* Help message */,
    upload: getText('Upload') /* Label for a button to upload a picture */,
    previewImage: getText('Preview') /* Label for a preview image whose content is unknown*/,
  }[key]);

export default messages;
