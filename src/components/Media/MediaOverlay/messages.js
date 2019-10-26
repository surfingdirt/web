const messages = (getText, getPlural) => (key) =>
  ({
    previous: getText(
      'Previous',
      'MediaOverlay',
    ) /* Label of a button to scroll a list of items back */,
    next: getText(
      'Next',
      'MediaOverlay',
    ) /* Label of a button to scroll a list of items forward */,
  }[key]);

export default messages;
