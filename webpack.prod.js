const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { cleanWebpackPlugin, CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
      },
    module: {
        rules:[
            {
                test: /\.scss$/,
                use:[ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: '/\.js$',
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }, 
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "src", "client", "views", "index.html"),
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
    ]
}