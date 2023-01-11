/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetListWebpackPlugin = require('asset-list-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/app.js'),
    sw: path.resolve(__dirname, 'src/scripts/sw.js'),
  },
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === 'app' ? 'app.bundle.js' : 'sw.js';
    },
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg|webp)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(json|webmanifest)$/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]'
        }

      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
      excludeChunks: ['sw']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/icons'),
          to: path.resolve(__dirname, 'dist/icons'),
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new AssetListWebpackPlugin({
      name: 'ls',
      format: 'array',
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/scripts/components'),
      '@scss': path.resolve(__dirname, 'src/styles/scss'),
      '@images': path.resolve(__dirname, 'src/public/images'),
      '@global': path.resolve(__dirname, 'src/scripts/global'),
      '@utils': path.resolve(__dirname, 'src/scripts/utils'),
      '@routes': path.resolve(__dirname, 'src/scripts/routes'),
      '@public': path.resolve(__dirname, 'src/public'),
    },
  },
};
