const messages = (getText, getPlural) => (key) =>
  ({
    pageNotFound: getText('Page not found', 'Page404') /* Header */,
    thePageYouRequested: getText(
      'The page you requested does not seem to exist.',
      'Page404',
    ) /* Error message displayed when a page the user attempted to navigate to does not exist */,
    description: getText('Description', 'Page404') /* Description of the Not Found page */,
  }[key]);

export default messages;
