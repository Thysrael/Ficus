const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/main/filesystem/preload.js',
      nodeModulesPath: ['./node_modules']
    }
  },
  productionSourceMap: false
})
