const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: [
        "react-hot-loader/patch",
        // activate HMR for React

        "./src/index.js",
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: "/dist/"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".webpack.js", ".web.js", ".js"]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader'
            }, {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: false,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            },
            {
                test: /\.(png|jpg|gif|woff|svg|eot|ttf|woff2)$/,
                loader: 'url-loader?limit=1024&name=[name]-[hash:8].[ext]!image-webpack-loader',
            },
            { 
                test: /\.jsx?$/, 
                exclude: /node_modules/, 
                loaders: [
                    "react-hot-loader/webpack",
                    "babel-loader",
                    "source-map-loader"
                ]
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    devServer: {
        hot: true
    }

};