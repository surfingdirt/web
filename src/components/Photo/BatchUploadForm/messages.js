const messages = (getText, getPlural) => (key) =>
  ({
    clear: getText('Clear') /* Label for a button to clear a list of photos */,
    goToAlbum: getText('Go to album') /* Label for a link to go to the current album */,
    instructions: getText('Click here to choose photos') /* Help message */,
    instructionsMore: getText('Click here to add more photos') /* Help message */,
    previewImage: getText('Preview') /* Label for a preview image whose content is unknown */,
    stopUploads: getText('Stop') /* Label for a button to stop the uploading process */,
    upload: getText('Upload') /* Label for a button to upload a picture */,
    uploadFinished: getText('Upload finished!') /* Indicates the upload process worked properly */,
  }[key]);

export default messages;
