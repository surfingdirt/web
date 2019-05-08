const messages = (getText, getPlural) => (key) =>
  ({
    back: getText('Back'),
    continue: getText(
      'Continue',
      'Registration',
    ) /* Label of the button in the registration form to go to the next step */,
    league1: getText('All League 1 teams'),
    league2: getText('All League 2 teams'),
    register: getText('Register'),
    selectFavoriteTeams: getText('Select your favorite teams'),
    skip: getText('Skip'),
    totoCup: getText('All Toto Cup teams'),
    weWillPrepare: getText('We will prepare web and mobile content according to your preferences'),
    youCanChangeLater: getText('You can change your selection at any moment in your settings'),
    createNewAccount: getText('Create a new account'),
    creationError: getText('Account creation failed, please try again.'),
    loginError: getText('Login failed, please try again.'),
    step1Label: getText('Personal details'),
    step2Label: getText('Your favourites'),
    step3Label: getText('Notifications'),
    description: getText('Description'),
    name: getText('Create a new account'),
  }[key]);

export default messages;
