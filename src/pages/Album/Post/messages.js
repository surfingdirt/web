const messages = (getText, getPlural) => (key) =>
  ({
    albumCreationPage: getText(
      'Create a new album',
      'Album creation page',
    ) /* Title of the album creation page */,
  }[key]);

export default messages;
