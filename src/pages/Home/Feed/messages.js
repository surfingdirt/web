const messages = (getText, getPlural) => (key) =>
  ({
    endReached: getText(
      "That's it!",
      'Feed',
    ) /* Indicates the user has reached the end of the feed */,
    feedIntro: getText(
      'This page shows the latest activity on Surfing Dirt: content and messages posted by our members',
      'Feed',
    ) /* Help text explaining what the feed page is*/,
    moreFeedPages: getText('More', 'Feed') /* Label for a button to load more data in the feed */,
  }[key]);

export default messages;
