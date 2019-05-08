const messages = (getText, getPlural) => (key) =>
  ({
    signIn: getText(
      'Sign in',
      'LoginLogout',
    ) /* Action button label in the login corner of the site navigation */,
    signOut: getText(
      'Sign out',
      'LoginLogout',
    ) /* Action button label in the login corner of the site navigation */,
    register: getText(
      'Register',
      'LoginLogout',
    ) /* Action button label in the login corner of the site navigation */,
  }[key]);

export default messages;
