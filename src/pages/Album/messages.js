const messages = (getText, getPlural) => (key) =>
  ({
    albumMenuLabel: getText('Options') /* Label for a menu */,
    batchUpload: getText(
      'Post multiple photos',
      'Album page',
    ) /* Label for a menu item to add many photos to an album */,
    edit: getText('Edit', 'Album page') /* Label for a menu item to edit an album */,
    loadMore: getText(
      'Load more',
      'Album page',
    ) /* Label for a button to load more photos and videos */,
  }[key]);

export default messages;
