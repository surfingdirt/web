const messages = (getText, getPlural) => (key) =>
  ({
    avatar: getText(
      'Profile photo',
      'Profile',
    ) /* An image which represents a user, typically their face */,
    cover: getText(
      'Profile cover photo',
      'Profile',
    ) /* An image the user has chosen to associate with themselves */,
    logout: getText('Logout', 'Profile') /*  */,
    name: getText('Profile', 'Profile') /*  */,
  }[key]);

export default messages;
