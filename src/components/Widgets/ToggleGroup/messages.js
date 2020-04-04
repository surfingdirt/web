const messages = (getText, getPlural) => (key) =>
  ({
    previous: getText('Previous') /* Label of a button to scroll a list of items back */,
    next: getText('Next') /* Label of a button to scroll a list of items forward */,
  }[key]);

export default messages;
