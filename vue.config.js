const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nsis: {
        allowToChangeInstallationDirectory: true,
        oneClick: false,
        installerIcon: 'build/icon.png',
        installerHeaderIcon: 'build/icon.png'
      },
      preload: 'src/main/filesystem/preload.js',
      nodeModulesPath: ['./node_modules']
    }
  },
  productionSourceMap: false
})
