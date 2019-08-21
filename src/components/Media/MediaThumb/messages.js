const messages = (getText, getPlural) => (key) =>
  ({
    thumbAlt: getText('Unknown image') /* Indicates the system does not know what an image represents */,
  }[key]);

export default messages;
