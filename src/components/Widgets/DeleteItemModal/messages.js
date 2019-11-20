const messages = (getText, getPlural) => (key) =>
  ({
    quote: getText(
      "Are you sure you want to delete '%s'?",
    ) /* Label for a button the user can click to stop deleting an item */,
    cancelDelete: getText(
      'No, cancel',
    ) /* Label for a button the user can click to stop deleting an item */,
    confirmDelete: getText(
      'Yes, delete it',
    ) /* Label for a button the user can click to confirm they want to delete an item */,
    deleteItemMenuEntryLabel: getText(
      'Delete',
    ) /* Label for a menu entry to change delete an item */,
    deleteItemModalTitle: getText('Are you sure?') /* Title of a dialog window to delete an item */,
    deleteItemDialogLabel: getText(
      'Delete dialog',
    ) /* Label for a dialog window to delete an items */,
  }[key]);

export default messages;
