module.exports = ({ file, options, env }) => ({
  plugins: {
    'postcss-import': { root: file.dirname },
    'postcss-preset-env': options.postcssPresetEnv ? options.postcssPresetEnv : false,
    // Bug in some webpack plugin in production:
    // 'postcss-clean': env === 'production' ? options.clean : false,
    'postcss-rtl': {},
    'postcss-discard-comments': { removeAll: true },
  },
});
