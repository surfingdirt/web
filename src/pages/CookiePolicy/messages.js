const messages = (getText, getPlural) => (key) =>
  ({
    cookiePolicy: getText('Cookie Policy', 'CookiePolicy') /* Header */,
    description: getText('Description', 'CookiePolicy') /* Description of the Cookie Policy page */,
    name: getText('Cookie Policy', 'CookiePolicy') /* Name of the Cookie Policy page */,
  }[key]);

export default messages;
