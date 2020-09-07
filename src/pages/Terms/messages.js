const messages = (getText, getPlural) => (key) =>
  ({
    privacy: getText('Surfing Dirt is back!', 'About') /* Title of the About page */,
  }[key]);

export default messages;
