const messages = (getText, getPlural) => (key) =>
  ({
    actionNav: getText(
      'Actions',
      'Page Layout',
    ) /* Label for a navigation section containing links to add new items */,
    actionButton: getText(
      'Add',
      'Page Layout',
    ) /* Label for a button which opens a list of links to add new items */,
    activity: getText(
      'Activity',
      'Page Layout',
    ) /* Label for a link to a page where the user can see the activity on the site  */,
    createAnAlbum: getText(
      'Create an album',
      'Actions',
    ) /* Label of a link to a page where a user could create a new album */,
    more: getText(
      'More',
      'Page Layout',
    ) /* Label for a button which opens a list of additional navigation items */,
    postAPhoto: getText(
      'Post a photo',
      'Actions',
    ) /* Label of a link to a page where a user could add a new photo */,
    postAVideo: getText(
      'Post a video',
      'Actions',
    ) /* Label of a link to a page where a user could add a new video */,
    profile: getText('Profile', 'Page Layout') /* Label for a link to the user's profile page */,
    search: getText('Search', 'Page Layout') /* Label for a button which opens up the search bar */,
  }[key]);

export default messages;
