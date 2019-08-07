const messages = (getText, getPlural) => (key) =>
  ({
    cover: getText(
      'Profile cover photo',
      'Profile',
    ) /* An image the user has chosen to associate with themselves */,
    coverMenuLabel: getText(
      'Cover menu',
      'Profile',
    ) /* Label for a menu containing actions (update picture, etc.) */,
    updateAvatar: getText(
      'Update profile picture',
      'Profile',
    ) /* Label for a button to start updating the user's profile picture */,
    updateCover: getText(
      'Update cover picture',
      'Profile',
    ) /* Label for a button to start updating the user's cover picture */,
  }[key]);

export default messages;
