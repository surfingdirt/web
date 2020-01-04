const messages = (getText, getPlural) => (key) =>
  ({
    done: getText(
      'Your new password is now activated!',
      'New password activation',
    ) /* Message displayed when a new password was successfully activated */,
    passwordActivation: getText(
      'Password Activation',
      'New password activation',
    ) /* Title of a page */,
    signIn: getText('Sign in', 'SignIn') /* Header */,
    useNewPassword: getText(
      'User the new password we emailed you to sign in!',
      'New password activation',
    ) /* Indicates how to sign in after a new password was activated */,
  }[key]);

export default messages;
