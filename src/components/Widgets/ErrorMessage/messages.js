const messages = (getText, getPlural) => (key) =>
  ({
    unknownErrorName: getText(
      'An unexpected error occurred',
      'Error',
    ) /* A vague error message to be displayed when we don't know what exactly happened */,
    failedToLogin: getText(
      'Login failed',
      'Error',
    ) /* Error message displayed when a user tried to signIn */,
  }[key]);

export default messages;
