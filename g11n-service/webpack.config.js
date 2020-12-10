const path = require("path");
const nodeExternals = require("webpack-node-externals");
const slsw = require("serverless-webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const isLocal = slsw.lib.webpack.isLocal;

module.exports = {
  mode: isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  externals: [nodeExternals(), {'aws-sdk' : 'commonjs aws-sdk'}],
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    alias: {
        "@bridged.xyz/client-sdk": '../packages/client-sdk-ts' // path.resolve(__dirname, '../packages/client-sdk-ts'),
    },
    plugins:[new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
  target: "node",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/,}

      // {
      //   test: /\.ts$/,
      //   loader: 'babel-loader',
      //   options: {
      //     presets: [
      //       [
      //         '@babel/preset-env',
      //         {
      //           targets: {
      //             node: true,
      //           },
      //         },
      //       ],
      //       "@babel/preset-typescript",
      //     ],
      //     plugins:[
      //       ["babel-plugin-module-resolver", {
      //           "alias": {
      //               "@bridged.xyz/client-sdk": "../packages/client-sdk-ts"
      //           }
      //       }],
      //       ["@babel/plugin-proposal-decorators", {"legacy": true }],
      //       ["babel-plugin-parameter-decorator"],
      //       ["@babel/plugin-transform-runtime",   {
      //           "regenerator": true
      //       }],
      //     ]
      //   },
      //   include: [__dirname],
      //   exclude: /node_modules/,
      // },
    ],
  },
  externals: [nodeExternals({
    modulesDir: path.resolve(__dirname, '../packages/client-sdk-ts'),
  })],
  plugins: [new ForkTsCheckerWebpackPlugin(), new TsconfigPathsPlugin()],
};