const messages = (getText, getPlural) => (key) =>
  ({
    backendError: getText(
      'An error occurred while resetting your password',
      'Password',
    ) /* Error message displayed when something went wrong */,
    done: getText(
      'We sent an email to your account. Click the link to activate your new password!',
      'Password',
    ) /* Message displayed when a new password was sent successfully */,
    explanations: getText(
      "If you can't remember your password, enter your username below and we'll send you a new one.",
      'Password',
    ) /* Message explaining how to request a new password */,
    lostYourPassword: getText(
      'Lost your password?',
      'Password',
    ) /* Title for the page where a user can reset their password */,
    mutationError: getText(
      'An error occurred while requesting a new password',
      'Password',
    ) /* Error message displayed when something went wrong */,
    send: getText('Send', 'Password') /* Label for a button to submit a form */,
    username: getText('Username', 'Password') /* Label for a form input to type a username */,
  }[key]);

export default messages;
