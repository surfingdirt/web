const messages = (getText, getPlural) => (key) =>
  ({
    vote: getText('Vote', '4 Down') /* Label for a button to cast a vote */,
    selected: getText('Selected', '4 Down') /* Label for an item chosen for a vote */,
    shareLink: getText('Share link', '4 Down') /* Label for a link */,
  }[key]);

export default messages;
