module.exports = {
  verbose: true,
  setupTestFrameworkScriptFile: './src/setupTests.js',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(svg|png|ico)$': '<rootDir>/src/fakeSVG.js',
  },
  transform: {
    '.*': 'babel-jest',
  },
};
