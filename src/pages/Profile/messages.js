const messages = (getText, getPlural) => (key) =>
  ({
    add: getText('Add intro', 'Profile') /* Label for a button to enter an introduction */,
    emptyBio: getText(
      'You have not entered an introduction yet. Click the button to let other riders know about you!',
      'Profile',
    ) /* Placeholder text displayed when the user introduction is still empty  */,
    profile: getText('Profile', 'Profile') /*  */,
    update: getText('Update intro', 'Profile') /* Label for a button to update an introduction */,
    updateUserBio: getText(
      'Update your introduction',
    ) /* Title of a dialog window to change the user's introduction */,
    updateUserBioDialogLabel: getText(
      'Profile introduction update dialog',
    ) /* Label for a dialog window to change the user's introduction */,
  }[key]);

export default messages;
