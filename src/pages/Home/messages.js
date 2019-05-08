const messages = (getText, getPlural) => (key) =>
  ({
    description: getText('Description', 'Home') /*  */,
    name: getText('Home', 'Home') /*  */,
  }[key]);

export default messages;
