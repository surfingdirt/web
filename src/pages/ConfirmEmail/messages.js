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
  }[key]);

export default messages;
