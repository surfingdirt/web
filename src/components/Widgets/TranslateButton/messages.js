const messages = (getText, getPlural) => (key) =>
  ({
    translate: getText('Translate') /* Label for a button to translate a message */,
  }[key]);

export default messages;
