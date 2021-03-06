const messages = (getText, getPlural) => (key) =>
  ({
    emailInvalid: getText(
      'Email is invalid',
      'Form errors',
    ) /* Error message displayed when a bad email address was entered */,
    exists: getText(
      'Already taken!',
      'Form errors',
    ) /* Error message displayed foe example when a user chooses a username or email that's already used by someone else */,
    notSame: getText(
      'Not identical',
      'Form errors',
    ) /* Error message displayed when a text field is different from another (example: two password fields) */,
    required: getText(
      'Required',
      'Form errors',
    ) /* Error message displayed when the user left a required field empty */,
    tooShort: getText(
      'Too short',
      'Form errors',
    ) /* Error message displayed when the user typed a short message */,
  }[key]);

export default messages;
