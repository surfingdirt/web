const messages = (getText, getPlural) => (key) =>
  ({
    vote: getText('Vote', '4 Down') /* Label for a button to cast a vote */,
  }[key]);

export default messages;
