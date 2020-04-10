const messages = (getText, getPlural) => (key) =>
  ({
    feedIntro: getText(
      'This page shows the latest activity on Surfing Dirt: content and messages posted by our members',
      'Feed',
    ) /* Help text explaining what the feed page is*/,
  }[key]);

export default messages;
