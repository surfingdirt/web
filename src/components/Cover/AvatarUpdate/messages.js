const messages = (getText, getPlural) => (key) =>
  ({
    avatar1: getText(
      'Choose a picture to represent yourself on the site.',
    ) /* Label for a form field to choose a profile picture (part 1) */,
    avatar2: getText(
      'Make it personal and easy to recognize!',
    ) /* Label for a form field to choose a profile picture  (part 2) */,
    backendError: getText('An error occurred. Please try again.') /* Generic error message */,
    cancel: getText('Cancel') /* Label for a button to stop the current operation */,
    instructions: getText('Click here to choose a file') /* Help message */,
    invalidImage: getText(
      'Invalid image',
    ) /* Error message displayed when the user chose a image file that cannot be read */,
    upload: getText('Upload') /* Label for a button to upload a picture */,
    pleasePickAFile: getText(
      'Please choose a file first',
    ) /* Error message displayed when a user tries to update their profile picture but did not choose file yet. */,
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
