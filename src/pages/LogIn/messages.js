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
    explanationsOAuth: getText(
      'You can login with Google or Facebook:',
      'SignIn',
    ) /* Paragraph explaining how to register */,
    explanationsEmailPassword: getText(
      'Or enter your email and password below:',
      'SignIn',
    ) /* Paragraph explaining how to register */,
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

    oAuthStart: getText(
      'Starting',
      'SignIn',
    ) /* Message displayed when the user starts logging in */,
    oAuthFetchingToken: getText(
      'Authorizing...',
      'SignIn',
    ) /* Message displayed when the login request is ongoing */,
    oAuthCheckingEmail: getText(
      'Verifying email...',
      'SignIn',
    ) /* Message displayed when the user's email is being checked */,
    oAuthEnteringUsername: getText(
      'Waiting for additional info',
      'SignIn',
    ) /* Message displayed when the user is meant to enter missing information */,
    oAuthCreatingProfile: getText(
      'Creating account...',
      'SignIn',
    ) /* Message displayed when the user's account is being created */,
    oAuthSigningYouIn: getText(
      'Signing you in...',
      'SignIn',
    ) /* Message displayed when the user is being logged in */,
    oAuthSignInSuccess: getText(
      'Success!',
      'SignIn',
    ) /* Message displayed when the user was successfully logged in */,
    oAuthNoDataError: getText(
      'No data could be retrieved',
      'SignIn',
    ) /* Message displayed when no data could be retrieved from Google or Facebook */,
    oAuthSignInError: getText(
      'An error occurred',
      'SignIn',
    ) /* Message displayed when a sign-in error occured */,

    registerLong: getText(
      'Register a new account',
      'SignInRegister',
    ) /* Long label for a registration button */,
    registerShort: getText(
      'Register',
      'SignInRegister',
    ) /* Short label for a registration button */,
    loginLong: getText(
      'Sign in with your account',
      'SignInRegister',
    ) /* Long label for a login button */,
    loginShort: getText('Sign in', 'SignInRegister') /* Short label for a login button */,
  }[key]);

export default messages;
