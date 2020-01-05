const messages = (getText, getPlural) => (key) =>
  ({
    registration: getText(
      'Registration',
      'Registration',
    ) /* Title of the page to create an account */,
    explanations: getText(
      "If you'd like to join us, enter your details below to create an account!",
      'Registration',
    ) /* Paragraph explaining how to register */,
    timezone: getText(
      'Timezone',
      'Registration',
    ) /* Label for a list of timezones the user can choose from */,
    pickATimeZone: getText(
      'Please choose one',
      'Registration',
    ) /* Help message telling the user they need to choose a timezone */,
    locale: getText(
      'Language',
      'Registration',
    ) /* Label for a list of countries and languages the user can choose from */,
    pickALocale: getText(
      'Please choose one',
      'Registration',
    ) /* Help message telling the user they need to choose a language */,
    username: getText('Username', 'Registration') /* Label for a form input to type a username */,
    register: getText(
      'Register',
      'Registration',
    ) /* Label for a button to submit the registration form */,
    email: getText('Email', 'Registration') /* Label for a form input to type an email */,
    password: getText('Password', 'Registration') /* Label for a form input to type a password */,
    passwordConfirmation: getText(
      'Password confirmation',
      'Registration',
    ) /* Label for a form input to type a password confirmation */,
  }[key]);

export default messages;
