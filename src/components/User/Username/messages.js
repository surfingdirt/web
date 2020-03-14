const messages = (getText, getPlural) => (key) =>
  ({
    title: getText('Surfing Dirt is back!', 'User') /* Title of the About page */,
  }[key]);

export default messages;
