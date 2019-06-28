const messages = (getText, getPlural) => (key) =>
  ({
    avatar: getText('Profile photo', 'Profile') /*  */,
    logout: getText('Logout', 'Profile') /*  */,
    name: getText('Profile', 'Profile') /*  */,
  }[key]);

export default messages;
