const messages = (getText, getPlural) => (key) =>
  ({
    inputPlaceholder: getText(
      'Enter something',
    ) /* Text appearing inside a form field before the user entered anything */,
    required: getText(
      'Required',
    ) /* Short adjective indicating the user must fill a particular form field */,

    resetPassword: getText('Reset Password', 'ResetPassword') /* Header */,
    description: getText(
      'Description',
      'ResetPassword',
    ) /* Description of the Password Reset page */,
    name: getText('Reset Password', 'ResetPassword') /* Name of the Password Reset page */,
    password: getText(
      'New password',
      'ResetPassword',
    ) /* Label for a form field to enter a new password */,
    passwordConfirmation: getText(
      'Confirm new password',
      'ResetPassword',
    ) /* Label for a form field to confirm a new password */,
    resetPasswordButton: getText(
      'Reset password',
      'ResetPassword',
    ) /* Label of a button to reset a password */,
    errorOccured: getText(
      'An error occured',
      'ResetPassword',
    ) /* Error message shown when a password could not be reset */,
  }[key]);

export default messages;
