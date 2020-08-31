const messages = (getText, getPlural) => (key) =>
  ({
    vote: getText('Vote', '4 Down') /* Label for a button to cast a vote */,
    selected: getText('Selected', '4 Down') /* Label for an item chosen for a vote */,
    shareLink: getText('Share link', '4 Down') /* Label for a link */,
    errorTryHere: getText(
      'An error occurred while saving your vote. Please click here to try again.',
      '4 Down',
    ) /* Error message */,
  }[key]);

export default messages;
