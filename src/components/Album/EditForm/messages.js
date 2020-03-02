const messages = (getText, getPlural) => (key) =>
  ({
    advanced: getText('Advanced settings') /* Label for a button to reveal more settings */,
    albumContributions: getText(
      'Contributions',
    ) /* Form field to decide whether other users can contribute to an album */,
    albumContributionsNote: getText(
      'Note: other people can post into your public albums, whereas only you can contribute to your private albums.',
    ) /* Note to explain how album contributions work */,
    albumVisibility: getText(
      'Visibility',
    ) /* Form field to decide whether other users can see an album */,
    albumVisibilityNote: getText('Note:') /* Note to explain how album visibility works */,
    albumVisibilityNote1: getText(
      'Visible albums (the default) are visible to everyone.',
    ) /* Note to explain how album visibility works */,
    albumVisibilityNote2: getText(
      'Hidden albums are only visible to you.',
    ) /* Note to explain how album visibility works */,
    albumVisibilityNote3: getText(
      'Unlisted albums are visible to everyone with the link.',
    ) /* Note to explain how album visibility works */,
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
    edit: getText('Edit') /* Label for a button to edit a photo */,
  }[key]);

export default messages;
