const messages = (getText, getPlural) => (key) =>
  ({
    addAPhoto: getText(
      'Add a photo',
      'Actions',
    ) /* Label of a link to a page where a user could add a new photo. Please keep this translation as short as possible */,
    addAVideo: getText(
      'Add a video',
      'Actions',
    ) /* Label of a link to a page where a user could add a new video. Please keep this translation as short as possible. */,
  }[key]);

export default messages;
