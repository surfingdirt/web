const messages = (getText, getPlural) => (key) =>
  ({
    googleLogin: getText('Login with Google', 'Button') /*  */,
    facebookLogin: getText('Login with Facebook', 'Button') /*  */,
  }[key]);

export default messages;
