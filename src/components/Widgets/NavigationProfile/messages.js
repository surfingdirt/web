const messages = (getText, getPlural) => (key) =>
  ({
    account: getText(
      'Account',
      'NavigationProfile',
    ) /* Label for a menu to manage the user's account */,
    login: getText('Sign in', 'NavigationProfile') /* Label for a link to the login page */,
    profile: getText('Profile', 'Page Layout') /* Label for a link to the user's profile page */,
    register: getText('Register', 'LoggedOut') /* Label of a link to the registration page */,
    settings: getText('Settings', 'Page Layout') /* Label for a link to the user's settings page */,
  }[key]);

export default messages;
