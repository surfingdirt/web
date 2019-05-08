const messages = (getText, getPlural) => (key) =>
  ({
    followUs: getText(
      'Follow Us',
      'DualContainer',
    ) /* Title of a section containing a list of social media links */,
    viewAll: getText('View all', 'DualContainer') /* Title of a button to expand a list */,
  }[key]);

export default messages;
