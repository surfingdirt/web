const messages = (getText, getPlural) => (key) =>
  ({
    directLink: getText('Full page') /* Label for a link to a media's dedicated page */,
    edit: getText('Edit') /* Link to a page to modify something (a photo for example) */,
    inAlbum: getText('Posted in album') /* Indicates which album a given item belongs to */,
    overlayMenuLabel: getText('Options') /* Label for a menu */,
  }[key]);

export default messages;
