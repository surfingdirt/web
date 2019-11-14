const messages = (getText, getPlural) => (key) =>
  ({
    invalid: getText('invalid') /* Short adjective indicating a form field is incorrect */,
    reply: getText('Reply', 'Comments') /* Label for a button to post a comment */,
    required: getText(
      'Required',
    ) /* Short adjective indicating the user must fill a particular form field */,
    tone: getText(
      'tone',
      'Comments',
    ) /* Label for the dropdown to choose a message tone (sad, angry, etc.) */,
    content: getText('message', 'Comments') /* Label for a text input containing a comment */,
    neutral: getText('neutral', 'Comments') /* Indicates a message was written in a neutral tone */,
    joking: getText('joking', 'Comments') /* Indicates a message was written in a joking tone */,
    angry: getText('angry', 'Comments') /* Indicates a message was written in an angry tone */,
    happy: getText('happy', 'Comments') /* Indicates a message was written in a happy tone */,
    sad: getText('sad', 'Comments') /* Indicates a message was written in a sad tone */,
  }[key]);

export default messages;
