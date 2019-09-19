const messages = (getText, getPlural) => (key) =>
  ({
    backendError: getText('An error occurred. Please try again.') /* Generic error message */,
    bio: getText(
      'Introduction',
    ) /* Label for a form field where a user can introduce themselves. */,
    bioPlaceholder: getText(
      'Tell people a little bit about yourself here.',
    ) /* Explains what to enter in the introduction field */,
    cancel: getText('Cancel', 'Modal') /* Label of a button to close a dialog window */,
    update: getText(
      'Update',
    ) /* Label on a button to update something */,
  }[key]);

export default messages;
