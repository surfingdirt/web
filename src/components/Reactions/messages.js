const messages = (getText, getPlural) => (key) =>
  ({
    reactions: getText('Reactions') /* Label for a list of user reactions */,
    total: getText('Total reactions') /* Indicates how many users reacted to something */,
    trigger: getText('Like') /* Label for a button to 'like' something */,

    angry: getText('Angry') /* Label for a user reaction icon: 😡 */,
    cool: getText('Cool') /* Label for a user reaction icon: 😎 */,
    fire: getText('Fire') /* Label for a user reaction icon: 🔥 */,
    injured: getText('Injured') /* Label for a user reaction icon: 🤕 */,
    impressed: getText('Impressed') /* Label for a user reaction icon: 😮 */,
    like: getText('Like') /* Label for a user reaction icon: 👍 */,
    laughing: getText('Laughing') /* Label for a user reaction icon: 🤣 */,
    sad: getText('Sad') /* Label for a user reaction icon: 😢 */,
  }[key]);
export default messages;
