const messages = (getText, getPlural) => (key) =>
  ({
    mediaPreviewModal: getText(
      'Media preview',
      'AlbumGrid',
    ) /* Label for a window containing a quick preview of a media page */,
  }[key]);

export default messages;
