import fs from 'fs-extra'
import path from 'path'
import Store from 'electron-store'
import schema from './schema.json'
import { hasSameKey } from '../helper/container'

/**
 * 用户偏好设置
 * 实现参考：https://github.com/marktext/marktext/blob/develop/src/main/preferences
 */
class Preference {
  constructor (preferencePath = '') {
    this._preferencePath = path.resolve(preferencePath, 'preferences.json')
    this._defaultPreferencePath = path.resolve(__dirname, '..', 'static', 'preferences.json')
    // 注：electron-store有性能问题（IO），但支持JSON scheme验证
    this._store = new Store({
      schema,
      name: 'preferences'
    })
  }

  async init () {
    let defaultSettings = null
    try {
      defaultSettings = JSON.parse(await fs.promises.readFile(this.staticPath, { encoding: 'utf8' }) || '{}')
    } catch (err) {
      console.log(err)
    }

    if (!defaultSettings) {
      throw new Error('Can not load static preference.json file')
    }

    if (!(await fs.pathExists(this._preferencePath))) {
      this.store.set(defaultSettings)
    } else {
      const userSetting = this.getAll()
      const requiresUpdate = !hasSameKey(defaultSettings, userSetting)
      if (requiresUpdate) {
        // Remove outdated settings
        for (const key of userSetting.keys()) {
          if (!defaultSettings.keys().includes(key)) {
            delete userSetting[key]
            this.store.delete(key)
          }
        }

        // Add new setting options
        let addedNewEntries = false
        for (const key in defaultSettings) {
          if (!userSetting.keys().includes(key)) {
            addedNewEntries = true
            userSetting[key] = defaultSettings[key]
          }
        }
        if (addedNewEntries) {
          this.store.set(userSetting)
        }
      }
    }
  }

  setItem (key, value) {
    return this._store.set(key, value)
  }

  getItem (key) {
    return this._store.get(key)
  }

  getAll () {
    return this._store.store
  }
}

export default Preference
