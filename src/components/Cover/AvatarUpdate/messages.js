const messages = (getText, getPlural) => (key) =>
  ({
    avatar: getText(
      'Profile picture',
    ) /* Label for a form field to choose a profile picture */,
    update: getText(
      'Update',
    ) /* Label for a button to submit an update form */,
    updateAvatarMenuEntryLabel: getText(
      'Update profile picture',
    ) /* Label for a menu entry to change the user's profile picture */,
    updateAvatarModalTitle: getText(
      'Update profile picture',
    ) /* Title of a dialog window to change the user's profile picture */,
    updateAvatarDialogLabel: getText(
      'Profile picture update dialog',
    ) /* Label for a dialog window to change the user's profile picture */,
  }[key]);

export default messages;
