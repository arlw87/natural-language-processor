const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "src", "client", "views", "index.html"),
            filename: "./index.html"
        })
    ]
}