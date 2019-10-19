const messages = (getText, getPlural) => (key) =>
  ({
    endReached: getText(
      'There are no more albums to load',
      'Albums page',
    ) /* Indicates the user has reached the end of the list of albums */,
  }[key]);

export default messages;
