const path = require('path');

export default {
  root: path.resolve(__dirname, 'src'),
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, './src/index.html'),
        login: path.resolve(__dirname, './src/login.html'),
        main: path.resolve(__dirname, './src/main.html'),
        postDetails: path.resolve(__dirname, './src/post-details.html'),
        createPost: path.resolve(__dirname, './src/create-post.html'),
        userPosts: path.resolve(__dirname, './src/user-posts.html'),
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
