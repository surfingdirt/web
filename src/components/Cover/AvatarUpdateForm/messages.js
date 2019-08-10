const messages = (getText, getPlural) => (key) =>
  ({
    avatar: getText(
      'Avatar',
    ) /* Title for the user avatar field */,
    update: getText(
      'Update',
    ) /* Title for the avatar update form button */,
  }[key]);

export default messages;
