const messages = (getText, getPlural) => (key) =>
  ({
    notSame: getText(
      'Not identical',
      'Form errors',
    ) /* Error message displayed when a text field is different from another (example: two password fields) */,
    emailInvalid: getText(
      'Email invalid',
      'Form errors',
    ) /* Error message displayed when a bad email address was entered */,
    tooShort: getText(
      'Too short',
      'Form errors',
    ) /* Error message displayed when the user typed a short message */,
  }[key]);

export default messages;
