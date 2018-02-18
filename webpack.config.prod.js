import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';

export default {
    devtool: 'source-map', // Source map settings - does not impact production as source maps are only downloaded when a user opens dev tools
    entry: {
        index: [
            "babel-polyfill",
            "whatwg-fetch",
            ppath('src/index')
        ],
        page2: [
            "babel-polyfill",
            "whatwg-fetch",
            ppath('src/pages/page2')
        ]
    },
    target: 'web', // You can use "node" or "electron" here
    output: {
        path: ppath('dist'), // Actual output for production build
        filename: 'bundle.[name].[chunkhash].js' // Bundle name
    },
    plugins: [
        // Hash the files using MD5 so that their names change when the content changes
        new WebpackMd5Hash(),

        // Create index.html with automatically injected bundle
        new HtmlWebpackPlugin({ // Uses ejs by default
            template: 'src/index.html',
            filename: "index.html",
            chunks: ['index'],
            inject: true,
            thisEnvironmentType: "PROD", // This is a custom property available in our html via ejs
            minify: { // Lots of options for minifying here
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        // Create index.html with automatically injected bundle
        new HtmlWebpackPlugin({ // Uses ejs by default
            template: 'src/pages/page2.html',
            filename: "pages/page2.html",
            chunks: ['page2'],
            inject: true,
            thisEnvironmentType: "PROD", // This is a custom property available in our html via ejs
            minify: { // Lots of options for minifying here
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false // Change/Remove this if you want a production source map (Disabling this because it shows up globally as /Users/pano :( Figure out why TBD)
        }) // Minify JS
    ],
    module: {
        // This means we can import any of these files with the import keyword
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }, {
            test: /\.scss$/,
            use: [
                {
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
        }, {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
        }]
    }
}

/**
 * Return the absolute path
 * @param location
 * @returns {*|string}
 */
function ppath(location) {
    return path.resolve(__dirname, location);
}
