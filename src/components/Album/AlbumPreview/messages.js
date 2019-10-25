const messages = (getText, getPlural) => (key) =>
  ({
    by: getText('by', 'Album') /* Indicates who created an album */,
    mediaPreviewModal: getText(
      'Media preview',
      'Album',
    ) /* Label for a window containing a quick preview of a media page */,
    public: getText(
      'Public',
      'Album',
    ) /* Indicates all registered users can contribute to a given an album */,
  }[key]);

export default messages;
