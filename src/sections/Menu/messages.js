const messages = (getText, getPlural) => (key) =>
  ({
    home: getText('Home', 'Menu') /* Label of a top-level entry in the navigation menu */,
    competitions: getText(
      'Competitions',
      'Menu',
    ) /* Label of a top-level entry in the navigation menu */,
    videos: getText('Videos', 'Menu') /* Label of a top-level entry in the navigation menu */,
    players: getText('Players', 'Menu') /* Label of a top-level entry in the navigation menu */,
    clubs: getText('Clubs', 'Menu') /* Label of a top-level entry in the navigation menu */,
    fixturesResults: getText(
      'Fixtures & Results',
      'Menu',
    ) /* Label of a top-level entry in the navigation menu */,
    standings: getText('Standings', 'Menu') /* Label of a top-level entry in the navigation menu */,
    fixtures: getText('Fixtures', 'Menu') /* Label of a top-level entry in the navigation menu */,
    seasonStats: getText(
      'Season Stats',
      'Menu',
    ) /* Label of a top-level entry in the navigation menu */,
    playerStats: getText(
      'Player Stats',
      'Menu',
    ) /* Label of a top-level entry in the navigation menu */,
    clubStats: getText(
      'Club Stats',
      'Menu',
    ) /* Label of a top-level entry in the navigation menu */,
    account: getText(
      'Sign in / Create New Account',
      'Menu',
    ) /* Label of a top-level entry in the navigation menu */,
    settings: getText('Settings', 'Menu') /* Label of a top-level entry in the navigation menu */,
    socialWall: getText(
      'Social Wall',
      'Menu',
    ) /* Label of a top-level entry in the navigation menu */,
    fantasyLeague: getText(
      'Fantasy League',
      'Menu',
    ) /* Label of a top-level entry in the navigation menu */,
    about: getText('About', 'Menu') /* Label of a top-level entry in the navigation menu */,
    partners: getText('Partners', 'Menu') /* Label of a top-level entry in the navigation menu */,
    faqs: getText('FAQs', 'Menu') /* Label of a top-level entry in the navigation menu */,
    contactUs: getText(
      'Contact Us',
      'Menu',
    ) /* Label of a top-level entry in the navigation menu */,
    playerComparison: getText(
      'Player Comparison',
      'Menu',
    ) /* Label of a top-level entry in the navigation menu */,
    clubComparison: getText(
      'Club Comparison',
      'Menu',
    ) /* Label of a top-level entry in the navigation menu */,
    results: getText('Results', 'Menu') /* Label of a top-level entry in the navigation menu */,
    news: getText('News', 'Menu') /* Label of a top-level entry in the navigation menu */,
    stats: getText('Stats', 'Menu') /* Label of a top-level entry in the navigation menu */,
    more: getText('More', 'Menu') /* Label of a top-level entry in the navigation menu */,
    navigationAriaLabel: getText(
      'Navigation',
      'Menu',
    ) /* Label of a top-level entry in the navigation menu */,
    searchExpander: getText(
      'Show search form',
      'Menu',
    ) /* Label for a button to display a search form */,
    searchPlaceholder: getText(
      'What are you looking for?',
      'Menu',
    ) /* Placeholder text for a text field to perform a search on the site */,
    searchLabel: getText(
      'Search terms',
      'Menu',
    ) /* Label for a text field containing the terms to use when performing a search operation on the site */,
    searchButton: getText(
      'Perform search',
      'Menu',
    ) /* Label for a button to perform a search operation on the site */,
  }[key]);

export default messages;
