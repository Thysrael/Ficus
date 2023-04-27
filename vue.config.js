const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/main/filesystem/preload.js',
      nodeModulesPath: ['./node_modules'],
      builderOptions: {
        nsis: {
          // allowToChangeInstallationDirectory: true,
          oneClick: true,
          perMachine: false
        },
        extraResources: {
          from: './build/exec/updater.exe',
          to: '../'
        }
      }
    }
  },
  productionSourceMap: false
})
