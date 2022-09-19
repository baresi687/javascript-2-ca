const path = require('path');

export default {
  root: path.resolve(__dirname, 'src'),
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, './src/index.html'),
        main: path.resolve(__dirname, './src/main.html'),
      },
    },
    outDir: '../dist',
  },
  resolve: {
    alias: {},
  },
  server: {
    port: 8080,
    hot: true,
  },
};
