const messages = (getText, getPlural) => (key) =>
  ({
    cover: getText(
      'Profile cover photo',
      'Profile',
    ) /* An image the user has chosen to associate with themselves */,
  }[key]);

export default messages;
