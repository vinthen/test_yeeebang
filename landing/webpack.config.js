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
      },
	  
	  /* ----- 打包 CSS ----- */
	  // 需要 css-loader 與 style-loader
	  {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader' ]
      },
	  
	  /* ----- 打包檔案 ----- */
	  // 需要 file-loader
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
	  
    ]
  }
};
