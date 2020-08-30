const messages = (getText, getPlural) => (key) =>
  ({
    welcome: getText(
      'Welcome to the 4 Down contest voting page!',
      '4 Down',
    ) /* Promo paragraph 1 */,
    weAreProud: getText(
      "Surfing Dirt is proud to sponsor this year's edition of the IMA's 4 Down video contest with a cash purse of $500.",
      '4 Down',
    ) /* Promo paragraph 2 */,
    teams: getText(
      'Let us know which video was your favorite below!',
      '4 Down',
    ) /* Promo paragraph 3 */,
    votePage: getText('4 Down project vote page', '4 Down') /* Video page title */,
    voteForThisVideo: getText(
      'Click the button below to cast your vote!',
      '4 Down',
    ) /* Info paragraph */,
  }[key]);

export default messages;
