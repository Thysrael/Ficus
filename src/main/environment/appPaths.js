import { app } from 'electron'

class AppPaths {
  constructor (userDataPath = '') {
    if (!userDataPath) {
      // Use default user data path.
      userDataPath = app.getPath('userData')
    }

    this._userDataPath = userDataPath
    app.setPath('userData', this._userDataPath)
  }

  get userDataPath () {
    return this._userDataPath
  }
}

export default AppPaths
