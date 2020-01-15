const messages = (getText, getPlural) => (key) =>
  ({
    email: getText('Email', 'Registration') /* Label for a form field to type an email */,
    lookingForHowTo: getText(
      'Looking for how to update your profile picture or cover photo? Go to your profile page instead!',
      'Settings',
    ) /* Help text for users */,
    locale: getText(
      'Language',
      'Registration',
    ) /* Label for a list of countries and languages the user can choose from */,
    newPassword: getText(
      'New password',
      'Settings',
    ) /* Label for a form field to type a new password */,
    newPasswordConfirmation: getText(
      'New password confirmation',
      'Settings',
    ) /* Label for a form field to type a new password again */,
    oldPassword: getText(
      'Current password',
      'Settings',
    ) /* Label for a form field to type the user's current password */,
    passwordUpdate: getText(
      'Update your password',
      'Settings',
    ) /* Title of a section where the user can enter a new password */,
    profilePage: getText(
      'Profile page',
      'Settings',
    ) /* Label for a link to the user's profile page */,
    save: getText('Save', 'Settings') /* Label for a button to submit the user settings form */,
    saveSuccessful: getText(
      'Settings were saved!',
      'Settings',
    ) /* Message displayed after settings were saved */,
    settings: getText('Settings', 'Settings') /* Title of the page to change user settings */,
    show: getText('Show', 'Settings') /* Label of a button to reveal a section */,
    timezone: getText(
      'Timezone',
      'Registration',
    ) /* Label for a list of timezones the user can choose from */,
  }[key]);

export default messages;
