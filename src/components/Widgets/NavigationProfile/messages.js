const messages = (getText, getPlural) => (key) =>
  ({
    account: getText(
      'Account',
      'NavigationProfile',
    ) /* Label for a menu to manage the user's account */,
    signIn: getText(
      'Sign in',
    ) /* Label for a link to the signIn page, or label for a button to actually signIn */,
    profile: getText('Profile') /* Label for a link to the user's profile page */,
    register: getText(
      'Register',
    ) /* Label for a link to the registration page, or label for a button to actually register */,
    settings: getText('Settings') /* Label for a link to the user's settings page */,
  }[key]);

export default messages;
