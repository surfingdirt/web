const messages = (getText, getPlural) => (key) =>
  ({
    empty: getText(
      'Nothing to see here, move along!',
      'Albums',
    ) /* Text displayed when an album is empty */,
  }[key]);

export default messages;
