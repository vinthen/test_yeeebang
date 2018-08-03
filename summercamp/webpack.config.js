const path = require("path");

module.exports = {
  entry: "./src",
  output: {    
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },

  mode: "development", // "production" | "development" | "none"
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
