const messages = (getText, getPlural) => (key) =>
  ({
    private: getText('Private') /* Choice for an album contributions setting */,
    public: getText('Public') /* Choice for an album contributions setting */,
  }[key]);

export default messages;
