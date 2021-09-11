const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(common, {
  entry: './server/index.tsx',
  target: 'node',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist', 'server'),
    filename: '[name].js',
    publicPath: '/',
    clean: true,
  },
  externals: [nodeExternals()], // node_modules에 바로 접근할 수 있으므로 제외.
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: '../client',
          filter: (resourcePath) => {
            return !resourcePath.includes('index.html');
          },
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
  },
});
