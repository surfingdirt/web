const messages = (getText, getPlural) => (key) =>
  ({
    confirmAccount: getText('Confirm Account', 'ConfirmAccount') /* Header */,
    accountConfirmed: getText(
      'Your account has been confirmed',
      'ConfirmAccount',
    ) /* Status message displayed after a user's account was successfully confirmed */,
    errorOccured: getText('An error occured', 'ConfirmAccount') /* Generic error message */,
    NotFoundError: getText(
      'User not found',
      'ConfirmAccount',
    ) /* Error message displayed when a particular user could not be found */,
    description: getText(
      'Description',
      'ConfirmAccount',
    ) /* Description of the Account Confirmation page */,
    name: getText('Confirmation', 'ConfirmAccount') /* Name of the Account Confirmation page */,
  }[key]);

export default messages;
