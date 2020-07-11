const messages = (getText, getPlural) => (key) =>
  ({
    /* No context for these messages as they must be shared across the app */
    inputPlaceholder: getText(
      'Enter something',
    ) /* Text appearing inside a form field before the user entered anything */,
    username: getText('Username') /* Label of a form field for the user's username */,
    email: getText('Email') /* Label of a form field for the user's email */,
    password: getText('Password') /* Label of a form field for the user's password */,
    required: getText(
      'Required',
    ) /* Short adjective indicating the user must fill a particular form field */,

    /* No context for these messages as they must be shared across the app */
    UserNotAuthorized: getText(
      'Login failed, please try again',
      'SignIn',
    ) /* Error message displayed when the user failed to log in */,
    signIn: getText(
      'Sign in',
    ) /* Label for a link to the signIn page, or label for a button to actually signIn */,
    register: getText('Register', 'SignIn') /* Header */,
    forgotYourPassword: getText(
      'Forgot your password?',
      'SignIn',
    ) /* Label for a link to generate a new password */,

    signInPage: getText('Sign in') /* Title for the page where a user signs in */,
    noUserFound: getText(
      'An error occurred and we could not sign you in. Would you like to try again?',
      'SignIn',
    ) /* Message displayed when something went wrong. */,
  }[key]);

export default messages;
