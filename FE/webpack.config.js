const path = require("path");

module.exports = {
  // ... other webpack configuration options ...

  resolve: {
    fallback: {
      fs: false, // or require.resolve("browserify-fs")
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      http: require.resolve("stream-http"),
      querystring: require.resolve("querystring-es3")
    }
  },

  // ... other webpack configuration options ...
};
