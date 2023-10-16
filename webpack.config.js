const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const IS_DEVELOPMENT = process.env.NODE_ENV === "dev";

const dirApp = path.join(__dirname, 'app');
const dirImages = path.join(__dirname, 'images');
const dirVideos = path.join(__dirname, 'videos');
const dirShared = path.join(__dirname, 'shared');
const dirStyles = path.join(__dirname, 'styles');
const dirNode = "node_modules";

module.exports = {
    entry: [
        path.join(dirApp, 'index.js'),
        path.join(dirStyles, 'index.scss'),
    ],
    resolve: {
        modules: [
            dirApp,
            dirShared,
            dirStyles,
            dirNode,
            dirImages,
            dirVideos
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEVELOPMENT
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './shared',
                    to: ''
                }
            ]
        }),
        new MiniCssExtractPlugin({ // inline and output css
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        // new ImageMinimizerPlugin({
        //     minimizer: {
        //         // Lossless optimization with custom option
        //         // Feel free to experiment with options for better result
        //         options: {
        //             plugins: [
        //                 ['gifsicle', { interlaced: true }],
        //                 ['jpegtran', { progressive: true }],
        //                 ['optipng', { optimizationLevel: 5 }]
        //             ]
        //         }
        //     }
        // })
    ],
    module: {
        rules: [
            {
                test: /\.js$/, // regular expression to match all .js files and run if matched
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/, // regular expression to match all .scss files and run if matched
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        }
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
            {
                // checks for jpeg, jpg, png, gif, svg, woff, woff2, fnt, webp
                test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
                loader: 'file-loader',
                options: {
                    name(file) {
                        return '[hash].[ext]'
                    }
                }
            },
            // {
            //     test: /\.(jpe?g|png|gif|svg|webp)$/i,
            //     use: [
            //       {
            //         loader: ImageMinimizerPlugin.loader,
            //       },
            //     ],
            // },
            {
                test: /\.glsl|frag|vert$/,
                loader: 'raw-loader',
                exclude: /node_modules/
            },
            {
                test: /\.glsl|frag|vert$/,
                loader: 'glslify-loader',
                exclude: /node_modules/
            },
        ]
    }
}