/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetListWebpackPlugin = require('asset-list-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminOptiPng = require('imagemin-optipng');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/app.js'),
    sw: path.resolve(__dirname, 'src/scripts/sw.js'),
  },
  output: {
    filename: ({ runtime }) => {
      return RegExp(/^sw$/).test(runtime) ? '[name].js' : 'js/[name].js';
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
    new ImageminWebpackPlugin({
      plugins: [
        (async () => {
          const { default: ImageminWebp } = await import('imagemin-webp');
          return ImageminWebp({
            quality: 50,
            progressive: true,
          });
        })(),
        ImageminOptiPng({
          quality: 30,
          progressive: true,
        }),
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle_sizes.html',
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
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '.',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
