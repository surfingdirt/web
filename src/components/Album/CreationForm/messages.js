const messages = (getText, getPlural) => (key) =>
  ({
    albumContributions: getText(
      'Contributions',
    ) /* Form field to decide whether other users can contribute to an album */,
    albumContributionsNote: getText(
      'Note: other people can post into your public albums, whereas only you can contribute to your private albums.',
    ) /* Note to explain how album contributions work */,
    backendError: getText('An error occurred. Please try again.') /* Generic error message */,
    create: getText('Create') /* Label of a button to create an item */,
    description: getText('Description') /* Label for a form field to enter a description */,
    descriptionPlaceholder: getText(
      'Enter a description',
    ) /* Help text to tell the user what to type */,
    required: getText(
      'Required',
    ) /* Short adjective indicating the user must fill a particular form field */,
    title: getText('Title') /* Label for a form field to enter a title */,
    titlePlaceholder: getText('Enter a title') /* Help text to tell the user what to type */,
  }[key]);

export default messages;
