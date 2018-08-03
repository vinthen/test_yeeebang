const path = require("path");

module.exports = {
  entry: "./js/layout.js",
  output: {    
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },

  mode: "production", // "production" | "development" | "none"
  watch: true,

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};
