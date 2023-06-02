const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/main/preload.js',
      nodeModulesPath: ['./node_modules'],
      builderOptions: {
        nsis: {
          // allowToChangeInstallationDirectory: true,
          oneClick: true,
          perMachine: false,
          include: './build/installer.nsh'
        },
        extraResources: [
          {
            from: './build/exec/updater.exe',
            to: '../'
          }
        ],
        mac: {
          target: [
            {
              target: 'mas',
              arch: [
                'universal'
              ]
            }
          ]
        }
      },
      externals: ['chokidar']
    }
  },
  productionSourceMap: false
})
