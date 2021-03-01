const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { cleanWebpackPlugin, CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
      },
    module: {
        rules:[
            {
                test: /\.scss$/,
                use:['style-loader', 'css-loader', 'sass-loader']
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
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
    ]
}