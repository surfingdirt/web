const messages = (getText, getPlural) => (key) =>
  ({
    batchUpload: getText(
      'Post multiple photos',
      'Album page',
    ) /* Label for a menu item to add many photos to an album */,
    loadMore: getText(
      'Load more',
      'Album page',
    ) /* Label for a button to load more photos and videos */,
  }[key]);

export default messages;
