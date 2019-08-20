const messages = (getText, getPlural) => (key) =>
  ({
    photoPostPage: getText(
      'Post a new photo',
      'Photo post page',
    ) /* Title of the photo post page */,
  }[key]);

export default messages;
