const messages = (getText, getPlural) => (key) =>
  ({
    /* No context for these messages as they must be shared across the app */
    inputPlaceholder: getText(
      'Enter something',
    ) /* Text appearing inside a form field before the user entered anything */,
    email: getText('Email') /* Label of a form field for the user's email */,
    required: getText(
      'Required',
    ) /* Short adjective indicating the user must fill a particular form field */,

    forgotPassword: getText('Forgot Password', 'ForgotPassword') /* Header */,
    send: getText('Send', 'ForgotPassword') /* Label of a button to submit a form */,
    emailSent: getText(
      'An email has been sent',
      'ForgotPassword',
    ) /* Status message displayed after the user was sent an email to reset their password */,
    NotFoundError: getText(
      'Email not found',
      'ForgotPassword',
    ) /* An error message stating the email the user entered does not match any in a database */,
    description: getText(
      'Description',
      'ForgotPassword',
    ) /* Description of the Forgotten Password page */,
    name: getText('Forgot Password', 'ForgotPassword') /* Name of the Forgotten Password page */,
  }[key]);

export default messages;
