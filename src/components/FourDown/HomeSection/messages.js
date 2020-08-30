const messages = (getText, getPlural) => (key) =>
  ({
    fourDown: getText("The IMA's video contest is open!") /*  */,
    description: getText(
      "Come watch all 4 productions from across the world, and cast your vote once you've picked your favorite video!",
    ) /* Description of the 4 Down contest */,
    vote: getText('Vote') /* Label for a link to the survey page */,
  }[key]);

export default messages;
