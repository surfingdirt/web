const messages = (getText, getPlural) => (key) =>
  ({
    headerAriaLabel: getText('Main header', 'Page Layout') /* */,
    mainAriaLabel: getText('Main content', 'Page Layout') /* */,
    account: getText(
      'Account',
      'NavigationProfile',
    ) /* Label for a menu to manage the user's account */,
    actionButton: getText(
      'Add',
      'Page Layout',
    ) /* Label for a button which opens a list of links to add new items */,
    activity: getText(
      'Activity',
      'Page Layout',
    ) /* Label for a link to a page where the user can see the activity on the site  */,
    addAnAlbum: getText(
      'Add an album',
      'Actions',
    ) /* Label of a link to a page where a user could create a new album. Please keep this translation as short as possible */,
    home: getText('Home', 'Page Layout') /* Label for a link to the homepage */,
    more: getText(
      'More',
      'Page Layout',
    ) /* Label for a button which opens a list of additional navigation items */,
    addAPhoto: getText(
      'Add a photo',
      'Actions',
    ) /* Label of a link to a page where a user could add a new photo. Please keep this translation as short as possible */,
    addAVideo: getText(
      'Add a video',
      'Actions',
    ) /* Label of a link to a page where a user could add a new video. Please keep this translation as short as possible. */,
    profile: getText('Profile', 'Page Layout') /* Label for a link to the user's profile page */,
    search: getText('Search', 'Page Layout') /* Label for a button which opens up the search bar */,
  }[key]);

export default messages;
