const messages = (getText, getPlural) => (key) =>
  ({
    moreAlbums: getText(
      'More Albums',
      'Home',
    ) /* Label for a link to a page containing more albums */,
  }[key]);

export default messages;
