const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: {
    index: "./src/index.js",
    content: "./src/inject/content.js",
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "/dist"),
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "./index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "background.html",
      template: "./index.html",
      chunks: ["content"],
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "./config"),
        to: "./",
        ignore: [".*"],
      },
      {
        from: path.resolve(__dirname, "./src/lib"),
        to: "./lib",
        ignore: [".*"],
      },
    ]),
  ],
};
