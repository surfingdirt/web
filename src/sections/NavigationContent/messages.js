const messages = (getText, getPlural) => (key) =>
  ({
    logoAlt: getText('Logo', 'Navigation') /* Description for the site logo */,
  }[key]);

export default messages;
