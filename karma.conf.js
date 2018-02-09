const webpack = require('webpack');

module.exports = config => {
  var host = process.env.HOST_IP;
  var webdriverConfig = {
    hostname: host,
    port: 4444
  };
  config.set({
    customLaunchers: {
      chrome_webdriver: {
        browserName: 'chrome',
        base: 'WebDriver',
        config: webdriverConfig,
        flags: ['--no-sandbox']
      }
    },
    hostname: host,
    port: process.env.KARMA_PORT,
    browsers: ['chrome_webdriver'],
    captureTimeout: 60000,
    browserDisconnectTimeout : 10000,
    browserDisconnectTolerance : 1,
    browserNoActivityTimeout : 60000,
    files: ['./node_modules/es6-shim/es6-shim.min.js', 'karma.entry.js'],
    frameworks: ['jasmine'],
    mime: { 'text/x-typescript': ['ts'] },
    preprocessors: {
      'karma.entry.js': ['webpack', 'sourcemap'],
      '*.js': ['sourcemap'],
      '**/*.spec.ts': ['sourcemap', 'webpack'],
    },
    reporters: ['spec'],
    webpack: {
      context: __dirname,
      devtool: 'sourcemap',
      module: {
        rules: [
          {
            test: /\.html$/,
            loaders: ['raw-loader'],
          },
          {
            test: /\.scss$/,
            loaders: ['raw-loader', 'sass-loader'],
          },
          {
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
          },
        ],
      },
      plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.SourceMapDevToolPlugin({
          filename: null,
          test: /\.(ts|js)($|\?)/i,
        }),
      ],
      resolve: {
        extensions: ['.ts', '.js'],
      },
    },
  });
};
