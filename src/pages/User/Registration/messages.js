const messages = (getText, getPlural) => (key) =>
  ({
    email: getText('Email', 'Registration') /* Label for a form field to type an email */,
    explanationsOAuth: getText(
      "If you'd like to join us, you can either go through Google or Facebook:",
      'Registration',
    ) /* Paragraph explaining how to register */,
    explanations: getText(
      'Or you can enter your details below to create an account!',
      'Registration',
    ) /* Paragraph explaining how to register */,
    locale: getText(
      'Language',
      'Registration',
    ) /* Label for a list of countries and languages the user can choose from */,
    password: getText('Password', 'Registration') /* Label for a form field to type a password */,
    seeYouSoon: getText(
      'See you in a minute!',
      'Registration',
    ) /* Short message displayed after a user created an account to tell them it won\'t be long anymore. */,
    needConfirmation: getText(
      'We just sent you an email, please open it and click the link in order to confirm your account! Until then, you will not be able to log in.',
      'Registration',
    ) /* Message displayed after a user succeeded in creating a new account */,
    passwordConfirmation: getText(
      'Password confirmation',
      'Registration',
    ) /* Label for a form field to type a password confirmation */,
    pickATimeZone: getText(
      'Please choose one',
      'Registration',
    ) /* Help message telling the user they need to choose a timezone */,
    pickALocale: getText(
      'Please choose one',
      'Registration',
    ) /* Help message telling the user they need to choose a language */,
    register: getText(
      'Register',
      'Registration',
    ) /* Label for a button to submit the registration form */,
    registration: getText(
      'Registration',
      'Registration',
    ) /* Title of the page to create an account */,
    timezone: getText(
      'Timezone',
      'Registration',
    ) /* Label for a list of timezones the user can choose from */,
    username: getText('Username', 'Registration') /* Label for a form field to type a username */,
    welcome: getText(
      'Welcome, %s!',
      'Registration',
    ) /* Welcoming message, includes a new user's username */,
  }[key]);

export default messages;
