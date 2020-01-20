const messages = (getText, getPlural) => (key) =>
  ({
    viewAll: getText('View all', 'DualContainer') /* Title of a button to expand a list */,
  }[key]);

export default messages;
