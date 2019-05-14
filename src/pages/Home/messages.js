const messages = (getText, getPlural) => (key) =>
  ({
    name: getText('Home', 'Home') /*  */,
  }[key]);

export default messages;
