const messages = (getText, getPlural) => (key) =>
  ({
    welcome: getText(
      'Welcome to the 2020 4 Down contest voting page!',
      '4 Down',
    ) /* Promo paragraph 1 */,
    weAreProud: getText(
      "We at Surfing Dirt are very excited to sponsor this year's edition of the IMA's 4 Down video contest.",
      '4 Down',
    ) /* Promo paragraph 2 */,
    teams: getText(
      'The 4 teams we have this year have once again delivered some amazing productions and we really hope you watch them all!',
      '4 Down',
    ) /* Promo paragraph 3 */,
    votePage: getText('4 Down project vote page', '4 Down') /* Video page title */,
    voteForThisVideo: getText(
      'Click the button below to cast your vote!',
      '4 Down',
    ) /* Info paragraph */,
  }[key]);

export default messages;
