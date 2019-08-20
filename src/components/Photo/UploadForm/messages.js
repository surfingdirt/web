const messages = (getText, getPlural) => (key) =>
  ({
    backendError: getText('An error occurred. Please try again.') /* Generic error message */,
    description: getText('Description') /* Label for a form field to enter a description */,
    descriptionPlaceholder: getText(
      'Enter a description',
    ) /* Help text to tell the user what to type */,
    instructions1: getText('Pick some file yo', 'Photo post page') /*  */,
    instructions2: getText('Click here to choose a file') /* Help message */,
    invalidImage: getText(
      'Invalid image',
    ) /* Error message displayed when the user chose a image file that cannot be read */,
    pleasePickAFile: getText(
      'Please choose a file first',
    ) /* Error message displayed when a user tries to update their profile picture but did not choose file yet. */,
    required: getText(
      'Required',
    ) /* Short adjective indicating the user must fill a particular form field */,
    title: getText('Title') /* Label for a form field to enter a title */,
    titlePlaceholder: getText('Enter a title') /* Help text to tell the user what to type */,
    upload: getText('Upload') /* Label for a button to upload a picture */,
  }[key]);

export default messages;
