const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const STATIC_PATH = '/src/main/resources/static';

module.exports = {

    context: path.join(__dirname, STATIC_PATH),

    entry: ['./js/index.js'],

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, STATIC_PATH, 'dist'),
    },

    devtool: 'eval-source-map',

    devServer: {
        hot: true,
        inline: true,
        compress: true,
        publicPath: '/',
        contentBase: path.join(__dirname, STATIC_PATH, '/dist/'),
        port: 3000,
        proxy: {
            "**": "http://localhost:8080"
        }
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            include: path.join(__dirname, STATIC_PATH, '/js'),
            use: [{
                loader: 'babel-loader',
            }]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            // template: '../templates/index.hbs',
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true
            }
        }),
    ],
};
