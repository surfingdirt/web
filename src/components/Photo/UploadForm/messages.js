const messages = (getText, getPlural) => (key) =>
  ({
    backendError: getText('An error occurred. Please try again.') /* Generic error message */,
    instructions1: getText('Pick some file yo', 'Photo post page') /*  */,
    instructions2: getText('Click here to choose a file') /* Help message */,
    invalidImage: getText(
      'Invalid image',
    ) /* Error message displayed when the user chose a image file that cannot be read */,
    pleasePickAFile: getText(
      'Please choose a file first',
    ) /* Error message displayed when a user tries to update their profile picture but did not choose file yet. */,
    upload: getText('Upload') /* Label for a button to upload a picture */,
  }[key]);

export default messages;
