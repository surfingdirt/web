const messages = (getText, getPlural) => (key) =>
  ({
    login: getText('Login', 'NavigationProfile') /* Label for a link to the login page */,
  }[key]);

export default messages;
