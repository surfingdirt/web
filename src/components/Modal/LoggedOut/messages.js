const messages = (getText, getPlural) => (key) =>
  ({
    /* No context for these messages as they must be shared across the app */
    noAccount: getText(
      "Don't have an account?",
    ) /* Title of a section indicating how to create an account */,
    noAccountSubtitle: getText(
      'In that case, you are missing out on:',
    ) /* Subtitle of a list of reasons to log in */,
    noAccountFeature1: getText(
      'Fantasy Premier League football game',
    ) /* A feature only registered users have access to */,
    noAccountFeature2: getText(
      'Exclusive Fan Service',
    ) /* A feature only registered users have access to */,
    noAccountFeature3: getText(
      'Customized site content',
    ) /* A feature only registered users have access to */,
    noAccountFeature4: getText(
      'Favourite club information and notifications',
    ) /* A feature only registered users have access to */,

    signIn: getText('Sign in', 'LoggedOut') /* Label of a link to the sign-in page */,
    register: getText('Register', 'LoggedOut') /* Label of a link to the registration page */,
    userNotLogged: getText(
      'You are currently logged out',
      'LoggedOut',
    ) /* Label of a dialog window indicating the user is not logged in */,
    loginRequired: getText(
      'To use this feature you need to be logged:',
      'LoggedOut',
    ) /* Title of a list of reasons to log in */,
  }[key]);

export default messages;
