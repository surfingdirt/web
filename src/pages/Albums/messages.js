const messages = (getText, getPlural) => (key) =>
  ({
    endReached: getText(
      'There are no more albums to load',
      'Albums page',
    ) /* Indicates the user has reached the end of the list of albums */,
    moreAlbums: getText(
      'More Albums',
      'Home',
    ) /* Label for a link to a page containing more albums */,
  }[key]);

export default messages;
