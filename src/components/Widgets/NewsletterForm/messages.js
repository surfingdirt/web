const messages = (getText, getPlural) => (key) =>
  ({
    emailAddress: getText('Email Address', 'Newsletter form') /* Label for a form field */,
    subscribe: getText(
      'Subscribe',
      'Newsletter form',
    ) /* Label for a newsletter subscription button */,
  }[key]);

export default messages;
