const messages = (getText, getPlural) => (key) =>
  ({
    backendError: getText('An error occurred. Please try again.') /* Generic error message */,
    description: getText('Description') /* Label for a form field to enter a description */,
    descriptionPlaceholder: getText(
      'Enter a description',
    ) /* Help text to tell the user what to type */,
    required: getText(
      'Required',
    ) /* Short adjective indicating the user must fill a particular form field */,
    title: getText('Title') /* Label for a form field to enter a title */,
    titlePlaceholder: getText('Enter a title') /* Help text to tell the user what to type */,
    url: getText('Video address') /* Label for a form field to enter a video address */,
    urlPlaceholder: getText('Paste the address here') /* Help text to tell the user what to type */,
    upload: getText('Upload') /* Label for a button to upload a picture */,
  }[key]);

export default messages;
