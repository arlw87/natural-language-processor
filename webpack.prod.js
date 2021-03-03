const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
      },
    module: {
        rules:[
            {
                test: /\.scss$/,
                //transforms files of one type to another type
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
        //sets the mini css extract plugin options
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new WorkboxPlugin.GenerateSW()
    ]
}