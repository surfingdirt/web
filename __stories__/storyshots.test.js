import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

import '../src/main.scss';

registerRequireContextHook();

const getMatchOptions = () => ({
  failureThreshold: 0.1,
  failureThresholdType: 'percent',
});

initStoryshots({
  suite: 'Storyshots',
  test: imageSnapshot({
    storybookUrl: 'http://localhost:9001',
    getMatchOptions,
  }),
});
