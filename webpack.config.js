module.exports = {
    // Other webpack configurations...
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: [
            /node_modules\/@mui\/icons-material/,
            /node_modules\/react-quill/
          ],
        },
      ],
    },
    // Other webpack configurations...
  };
  