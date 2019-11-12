const messages = (getText, getPlural) => (key) =>
  ({
    login: getText('Sign in', 'NavigationProfile') /* Label for a link to the login page */,
  }[key]);

export default messages;
