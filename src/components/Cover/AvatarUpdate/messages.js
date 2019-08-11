const messages = (getText, getPlural) => (key) =>
  ({
    avatar1: getText(
      'Choose a picture to represent yourself throughout the site.',
    ) /* Label for a form field to choose a profile picture (part 1) */,
    avatar2: getText(
      'Make it personal and recognizable, it tells people who you are!',
    ) /* Label for a form field to choose a profile picture  (part 2) */,
    cancel: getText(
      'Cancel',
    ) /* Label for a button to stop the current operation */,
    instructions: getText(
      'Click here to choose a file',
    ) /* Help message */,
    invalidImage: getText(
      'Invalid image',
    ) /* Error message displayed when the user chose a image file that cannot be read */,
    send: getText(
      'Send picture',
    ) /* Label for a button to send a picture */,
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
