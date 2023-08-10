const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    resolve: {
      fallback: {
        util: require.resolve('util/'),
        path: require.resolve('path-browserify'),
      },
    },
  },
})
