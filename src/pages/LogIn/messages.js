const messages = (getText, getPlural) => (key) =>
  ({
    /* No context for these messages as they must be shared across the app */
    inputPlaceholder: getText(
      'Enter something',
    ) /* Text appearing inside a form field before the user entered anything */,
    email: getText('Email') /* Label of a form field for the user's email */,
    password: getText('Password') /* Label of a form field for the user's password */,
    required: getText(
      'Required',
    ) /* Short adjective indicating the user must fill a particular form field */,

    /* No context for these messages as they must be shared across the app */
    noLAccount: getText(
      "Don't have an account?",
    ) /* Title of a section indicating how to create an account */,
    noLAccountSubtitle: getText(
      'In that case, you are missing out on:',
    ) /* Subtitle of a list of reasons to log in */,
    noLAccountFeature1: getText(
      'Fantasy Premier League football game',
    ) /* A feature only registered users have access to */,
    noLAccountFeature2: getText(
      'Exclusive Fan Service',
    ) /* A feature only registered users have access to */,
    noLAccountFeature3: getText(
      'Customized site content',
    ) /* A feature only registered users have access to */,
    noLAccountFeature4: getText(
      'Favourite club information and notifications',
    ) /* A feature only registered users have access to */,

    playerStats: getText('Player Stats', 'SignIn') /* Header */,
    description: getText('Description', 'SignIn') /* Description of the SignIn page */,
    name: getText('Sign In', 'SignIn') /* Name of the SignIn page */,
    UserNotAuthorized: getText(
      'Login failed, please try again',
      'SignIn',
    ) /* Error message displayed when the user failed to log in */,
    signIn: getText('Sign in', 'SignIn') /* Header */,
    register: getText('Register', 'SignIn') /* Header */,
    testTranslation: getText('Foobarbase', 'SignIn') /* Foobar */,
    forgotYourPassword: getText(
      'Forgot your password?',
      'SignIn',
    ) /* Label for a link to generate a new password */,
    or: getText('or', 'SignIn') /* Indicates a choice between two options */,
  }[key]);

export default messages;
