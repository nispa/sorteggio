const webpack = require("webpack");

module.exports = { 
  webpack: {
    node: {
            fs: 'empty'
          }, 
    externals: [
              {
                './cptable': 'var cptable'
              },

            ],
    configure: {
      resolve: {
         alias: {
          process: "process/browser",
          stream: "stream-browserify",
            zlib: "browserify-zlib"
        },
        fallback: { 
          process: require.resolve("process"),
          zlib: require.resolve("browserify-zlib"),
          stream: require.resolve("stream-browserify"),
          util: require.resolve("util"),
          buffer: require.resolve("buffer"),
          asset: require.resolve("assert"),
        },
      },
      module: {
        rules: [
           {
              test: /\.m?js/,
              resolve: {
                  fullySpecified: false
              }}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
          
        }),
      ],
    },
  },
};