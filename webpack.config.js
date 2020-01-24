const fs = require('fs');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const LoadablePlugin = require('@loadable/webpack-plugin');

const contentBaseUrl = require('./config/contentBaseUrl');
const { manifest } = require('./config/pwaConfig');
const buildConfig = require('./build.config.js');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const devtool = mode === 'production' ? '' : 'eval-source-map';

module.exports = {
  mode,
  devtool,
  entry: './client/index.jsx',
  output: {
    path: path.join(__dirname, buildConfig.outDirectory),
    filename: '[name].[hash:3].bundle.js',
    publicPath: contentBaseUrl,
    chunkFilename: '[name].[hash:3].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: buildConfig.resolverAliases,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-syntax-dynamic-import',
              '@loadable/babel-plugin',
            ],
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  loose: false,
                  shippedProposals: true,
                  useBuiltIns: 'usage',
                },
              ],
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:3].[ext]',
          outputPath: '/images',
          publicPath: `${contentBaseUrl}/images`,
        },
      },
      {
        test: /\.(otf|ttf|woff|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:3].[ext]',
          outputPath: '/fonts',
        },
      },
      {
        test: /\.css$/,
        use: [
          // include without further processing
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: buildConfig.cssTemplateClass,
              // how many loaders before css-loader should be
              // applied to @imported resources.
              importLoaders: 3,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {
                  postcssPresetEnv: {},
                  clean: {},
                },
              },
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {},
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(svg|po)$/,
        loader: 'raw-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: process.env.NODE_ENV === 'production' },
          },
        ],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/template.ejs',
      filename: './template.hbs',
      inject: false,
      favicon: './src/images/favicon.ico',
    }),
    new LoadablePlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:3].css',
      chunkFilename: '[id].[hash:3].css',
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 0,
      minRatio: 1,
    }),
    new CopyPlugin([{ from: './src/static', to: '[name].[ext]' }]),
    new WebpackPwaManifest(
      Object.assign({}, manifest, {
        // Note: instead of using existing icon files, the plugin can generate them on the fly.
        icons: [72, 96, 128, 144, 152, 192, 384, 512].map((size) => ({
          src: path.resolve(`src/images/icons/icon-${size}x${size}.png`),
          size: `${size}x${size}`,
        })),
      }),
    ),
    new SWPrecacheWebpackPlugin({
      cacheId: 'my-domain-cache-id',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'sw.js',
      // minify: true,
      navigateFallback: `${contentBaseUrl}offline.html`,
      // staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/],
    }),
  ],
  // required for some obscure reason (build will fail without this)
  // https://github.com/webpack-contrib/css-loader/issues/447
  node: {
    fs: 'empty',
  },
  stats: { children: false },
};
