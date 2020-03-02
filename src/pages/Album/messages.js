const messages = (getText, getPlural) => (key) =>
  ({
    albumMenuLabel: getText('Options') /* Label for a menu */,
    backendError: getText('An error occurred. Please try again.') /* Generic error message */,
    batchUpload: getText(
      'Post multiple photos',
      'Album page',
    ) /* Label for a menu item to add many photos to an album */,
    cannotDeleteNonEmptyAlbums: getText(
      'This album still contains photos or videos, it cannot be deleted.',
      'Album page',
    ) /* Error message displayed when a user tries to delete an album which contains photos or videos  */,
    edit: getText('Edit', 'Album page') /* Label for a menu item to edit an album */,
    loadMore: getText(
      'Load more',
      'Album page',
    ) /* Label for a button to load more photos and videos */,
  }[key]);

export default messages;
