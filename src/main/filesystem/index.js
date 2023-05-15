import { app, dialog } from 'electron'
import { makeFolderStat } from './statistic'

class FileSystem {
  constructor () {
    this.root = undefined
  }

  /**
   * 新建项目
   * @returns 项目信息
   */
  async newProject () {
    return await dialog.showOpenDialog({
      buttonLabel: '选择',
      defaultPath: app.getPath('desktop'),
      properties: ['createDirectory', 'openDirectory']
    }).then(async (result) => {
      if (result.canceled === true) {
        throw Error('cancel open folder')
      }
      this.root = result.filePaths[0]

      const projectStat = await makeFolderStat(result.filePaths[0])
      return projectStat
    })
  }
}

export default FileSystem
