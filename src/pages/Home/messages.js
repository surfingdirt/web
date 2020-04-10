const messages = (getText, getPlural) => (key) =>
  ({
    discover: getText(
      'Discover',
      'Homepage',
    ) /* Label for a section containing a lot of things for a new person to discover */,
    activity: getText(
      'Activity',
      'Homepage',
    ) /* Label for a section containing a vertical list of new things on the site */,
    tabsLabel: getText(
      'Main content',
      'Homepage',
    ) /* Indicates that what follows is the page's main content (help text for blind users) */,
  }[key]);

export default messages;
