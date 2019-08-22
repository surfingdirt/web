const messages = (getText, getPlural) => (key) =>
  ({
    title: getText('Riders list', 'Users') /* Title of the Riders page */,
  }[key]);

export default messages;
