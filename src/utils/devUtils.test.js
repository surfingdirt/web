import { defaultDevNowValue } from '../../config/index';

import { getNowValue } from './devUtils';

const PRODUCTION = 'production';
const STAGING = 'staging';
const DEVELOPMENT = 'develop';
const LOCAL = 'local';

const VALID_NOW = '2019-03-14T18:00:00.001';
const INVALID_NOW = '2019-03-14T18:00:00.00';

describe('getNowValue', () => {
  it('Returns null in prod', () => {
    expect(getNowValue({ query: { nowValue: VALID_NOW } }, PRODUCTION)).toBeNull();
    expect(getNowValue({ query: { nowValue: INVALID_NOW } }, PRODUCTION)).toBeNull();
  });

  it('Returns null in staging', () => {
    expect(getNowValue({ query: { nowValue: VALID_NOW } }, STAGING)).toBeNull();
    expect(getNowValue({ query: { nowValue: INVALID_NOW } }, STAGING)).toBeNull();
  });

  it('Returns null in development if value is invalid', () => {
    expect(getNowValue({ query: { nowValue: VALID_NOW } }, DEVELOPMENT)).toEqual(VALID_NOW);
    expect(getNowValue({ query: { nowValue: INVALID_NOW } }, DEVELOPMENT)).toEqual(
      defaultDevNowValue,
    );
  });

  it('Returns null in local if value is invalid', () => {
    expect(getNowValue({ query: { nowValue: VALID_NOW } }, LOCAL)).toEqual(VALID_NOW);
    expect(getNowValue({ query: { nowValue: INVALID_NOW } }, LOCAL)).toEqual(defaultDevNowValue);
  });
});
