const messages = (getText, getPlural) => (key) =>
  ({
    confirmation: getText(
      'Email confirmation',
      'Email',
    ) /* Title for the page where a user confirms their email is valid */,
    congratulations: getText(
      'Congratulations, your email is confirmed!',
      'Email',
    ) /* Message displayed once the user has confirmed their email address */,
    nowWhat: getText(
      'You can now go ahead and sign in with your email and password:',
      'Email',
    ) /* Message displayed once the user has confirmed their email address */,
    signIn: getText('Sign in', 'Email') /* Button label */,
    personalizeYourAccount: getText('Personalize your account') /* Instruction for a user */,
    goToYourProfilePage: getText('Go to your profile page') /* Instruction for a user */,
    clickSettings: getText(
      'Open the settings menu by pressing the three-dot button',
    ) /* Instruction for a user */,
    addCoverPhoto: getText('Add a cover photo') /* Instruction for a user */,
    addProfilePhoto: getText('Add a profile photo') /* Instruction for a user */,
    uploadPhotosOrVideos: getText('Upload photos or videos') /* Instruction for a user */,
    weSupport: getText(
      'We support JPEG and PNG photos, as well as Instagram, Facebook, YouTube, Videmo and DailyMotion videos',
    ) /* Instruction for a user */,
    addAnAlbum: getText('Add an album') /* Instruction for a user */,
    privateAlbums: getText(
      'Only you can contribute to your private albums',
    ) /* Instruction for a user */,
    publicAlbums: getText(
      'Other people can post to your public albums',
    ) /* Instruction for a user */,
    thingsTodo: getText(
      'Things to do now that you have an account',
    ) /* Title of a section of the page */,
  }[key]);

export default messages;
