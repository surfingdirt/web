const messages = (getText, getPlural) => (key) =>
  ({
    reactions: getText('Reactions') /* Label for a list of user reactions */,
    total: getText('Total reactions') /* Indicates how many users reacted to something */,
    defaultReaction: getText('Like') /* Label for a button to 'like' something */,
    reactionCount: getText('Reactions') /* Indicates the number of reactions */,

    angry: getText('Grrr') /* Label for a user reaction icon: angry 😡 */,
    cool: getText('Cool') /* Label for a user reaction icon: cool 😎 */,
    fire: getText('Fire') /* Label for a user reaction icon: fire 🔥 */,
    injured: getText('Ouch') /* Label for a user reaction icon: injured 🤕 */,
    impressed: getText('Wow') /* Label for a user reaction icon: impressed 😮 */,
    like: getText('Like') /* Label for a user reaction icon: like 👍 */,
    laughing: getText('Haha') /* Label for a user reaction icon: laughing 🤣 */,
    sad: getText('Sad') /* Label for a user reaction icon: sad 😢 */,
  }[key]);
export default messages;
