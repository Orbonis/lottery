const path = require("path");
const { compilerOptions } = require("./tsconfig.json");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const data = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js"
    },
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, "build"),
            watch: true
        }
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, compilerOptions.baseUrl),
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                loader: "ts-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
                loader: require.resolve("url-loader"),
                options: {
                    limit: 10000,
                    name: "static/media/[name].[hash:8].[ext]",
                },
            },
            {
                test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
                loader: require.resolve("file-loader"),
                options: {
                    name: "static/media/[name].[hash:8].[ext]",
                },
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "Lottery Technical Test",
            cache: false,
            hash: true,
            favicon: "assets/favicon.ico"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "assets", to: "assets" },
                { from: "assets/favicon.ico", to: "./favicon.ico" }
            ]
        })
    ]
};

module.exports = data;