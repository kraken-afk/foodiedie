const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
    // sw: path.resolve(__dirname, 'src/scripts/sw.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: "icons/[name].[ext]"
  },
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        type: "asset/resource"
      },
      {
        test: /\.json$/,
        type: "json"
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
          globOptions: {
            ignore: ['src/public/heros/**'],
          },
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/styles"),
      "@scss": path.resolve(__dirname, "src/styles/scss"),
      "@images": path.resolve(__dirname, "public/images"),
    }
  }
};
