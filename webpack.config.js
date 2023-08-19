const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = [
  {
    mode: "development",
    entry: "./index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "malaysia-postcodes.js",
      library: "malaysiaPostcodes",
      libraryTarget: "umd",
      umdNamedDefine: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
  },

  {
    mode: "production",
    entry: "./index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "malaysia-postcodes.min.js",
      library: "malaysiaPostcodes",
      libraryTarget: "umd",
      umdNamedDefine: true,
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
  },
];
