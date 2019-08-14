const messages = (getText, getPlural) => (key) =>
  ({
    logout: getText('Logout', 'Profile') /*  */,
  }[key]);

export default messages;
