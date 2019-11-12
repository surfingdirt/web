const messages = (getText, getPlural) => (key) =>
  ({
    previous: getText(
      'Previous',
      'Slider',
    ) /* Label of a button to scroll a list of items back */,
    next: getText(
      'Next',
      'Slider',
    ) /* Label of a button to scroll a list of items forward */,
  }[key]);

export default messages;
