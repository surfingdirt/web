const messages = (getText, getPlural) => (key) =>
  ({
    overlayMenuLabel: getText('Options') /* Label for a menu */,
    directLink: getText('Full page') /* Label for a link to a media's dedicated page */,
    inAlbum: getText('Posted in album') /* Indicates which album a given item belongs to */,
  }[key]);

export default messages;
