const messages = (getText, getPlural) => (key) =>
  ({
    about: getText(
      'About',
      'Footer',
    ) /* Name of the page where we explain what the site is about */,
    contact: getText(
      'Contact',
      'Footer',
    ) /* Name of the page where a user can write to the site owners */,
    forum: getText(
      'Forum',
      'Footer',
    ) /* Name of the forum section of the old site */,
  }[key]);

export default messages;
