const messages = (getText, getPlural) => (key) =>
  ({
    albumEditPage: getText(
      'Edit an album',
      'Album edit page',
    ) /* Title of the album edition page */,
  }[key]);

export default messages;
