const messages = (getText, getPlural) => (key) =>
  ({
    error: getText(
      'An error occurred while navigating, please reload the page.',
      'Loading',
    ) /* An error message */,
    timeout: getText(
      'The page could not load, please try and reload it.',
      'Loading',
    ) /* An error message */,
  }[key]);

export default messages;
