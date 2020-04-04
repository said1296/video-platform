const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './App.js',
    devServer: {
        contentBase: [
            path.resolve(__dirname, "dist")
        ],
        historyApiFallback: true,
        hot: true
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpg|gif|mp4)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        }
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader?attrs[]=video:src',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './dist/index.html'
        }),
    ],
    resolve: {
        modules: ["node_modules"]
    },
    resolveLoader: {
        modules: ["node_modules"]
    },
}