const messages = (getText, getPlural) => (key) =>
  ({
    invalid: getText('invalid') /* Short adjective indicating a form field is incorrect */,
    reply: getText('Reply', 'Comments') /* Label for a button to post a comment */,
    required: getText(
      'Required',
    ) /* Short adjective indicating the user must fill a particular form field */,
  }[key]);

export default messages;
