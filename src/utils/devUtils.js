import { defaultDevNowValue } from '../../config/index';

export const getNowValue = (req, nodeEnv) => {
  let nowValue = null;
  if (['local', 'develop'].includes(nodeEnv)) {
    nowValue = defaultDevNowValue;

    const nowInput = req.query.nowValue;
    if (nowInput) {
      const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}$/;
      const matches = nowInput.match(regex);
      if (matches && matches.length === 1) {
        nowValue = nowInput;
      }
    }
  }

  return nowValue;
};
