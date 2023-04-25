const { app } = require('electron')
const FileSystem = require('original-fs')
const Utils = require('util')
const request = require('request')
const progress = require('request-progress')
const admZip = require('adm-zip')
const fs = require('fs')
const crypto = require('crypto')
const semverDiff = require('semver-diff')
const log = require('electron-log')

// Yes, it's weird, but we need the trailing slash after the .asar
// so we can read paths "inside" it, e.g. the package.json, where we look
// for our current version
const AppPath = app.getAppPath() + '/'
const AppPathFolder = AppPath.slice(0, AppPath.indexOf('app.asar'))
const AppAsar = AppPath.slice(0, -1)
const WindowsUpdater = AppPath.slice(0, AppPath.indexOf('resources')) + 'updater.exe'
const UPDATE_FILE = 'update.asar'
const errors = [
  'version_not_specified',
  'cannot_connect_to_api',
  'no_update_available',
  'api_response_not_valid',
  'update_file_not_found',
  'failed_to_download_update',
  'failed_to_apply_update'
]

/**
 * */
const Updater = {
  /**
   * The setup
   * */
  setup: {
    api: null,
    body: null,
    headers: null,
    token: null,
    server: true,
    logFile: 'updater-log.txt',
    requestOptions: {},
    callback: false,
    progresscallback: false,
    debug: false,
    formatRes: function (res) { return res }
  },

  /**
   * The new update information
   * */
  update: {
    last: null,
    source: null,
    file: null,
    sha1: null
  },

  /**
   * Init the module
   * */
  init: function (setup) {
    this.setup = Utils._extend(this.setup, setup)

    this.log('AppPath: ' + AppPath)
    this.log('AppPathFolder: ' + AppPathFolder)
  },

  /**
   * Sha1
   * */
  sha1: function (buffer) {
    const fsHash = crypto.createHash('sha1')
    fsHash.update(buffer)
    const sha1 = fsHash.digest('hex')
    return sha1
  },

  /**
   * Logging
   * */
  log: function (line) {
    // Log it
    if (this.setup.debug) {
      console.log('Updater: ', line)
    }

    // Put it into a file
    log.info('[ electron-asar-hot-updater ]', line)
  },

  /**
   * Triggers the callback you set to receive the result of the update
   * */
  end: function (error, body) {
    if (typeof this.setup.callback !== 'function') return false
    this.setup.callback.call(
      this,
      error !== 'undefined' ? errors[error] : false,
      this.update.last,
      body
    )
  },

  /**
   * Make the check for the update
   * */
  check: function (callback) {
    if (callback) {
      this.setup.callback = callback
    }

    // Get the current version
    try {
      var packageInfo = JSON.parse(fs.readFileSync(AppPath + 'package.json'))
    } catch (e) {
      console.error(e)
    }

    this.log(packageInfo.version)

    // If the version property not specified
    if (!packageInfo.version) {
      this.log(
        'The "version" property not specified inside the application package.json'
      )
      this.end(0)

      return false
    }

    request(
      {
        url: this.setup.api,
        method: 'post',
        json: true,
        body: this.setup.body || {
          name: packageInfo.name,
          current: packageInfo.version
        },
        headers: this.setup.headers || {}
      },
      function (error, res, body) {
        if (!error) {
          try {
            body = Updater.setup.formatRes(body)
            let response = {}

            if (Updater.setup.server) {
              response = body
            } else {
              if (!body.version || !body.asar) {
                Updater.log('body.version and body.asar is required')
                Updater.end(3)
                return false
              }
              response = { last: body.version }
              if (semverDiff(packageInfo.version, body.version)) {
                response.source = body.asar
              }
              if (body.sha1) {
                response.sha1 = body.sha1
              }
            }

            // If the "last" property is not defined
            if (!response.last) {
              throw false
            }

            // Update available
            if (response.source) {
              Updater.log('Update available: ' + response.last)

              // Store the response
              Updater.update = response

              // Ask user for confirmation
              Updater.end(undefined, body)
            } else {
              Updater.log('No updates available')
              Updater.end(2)

              return false
            }
          } catch (error) {
            Updater.log(error)
            Updater.log('API response is not valid')
            Updater.end(3)
          }
        } else {
          Updater.log(error)
          Updater.log('Could not connect')
          Updater.end(1)
        }
      }
    )
  },

  /**
   * Download the update file
   * */
  download: function (callback) {
    if (callback) {
      this.setup.callback = callback
    }

    const url = this.update.source; const updateSha1 = this.update.sha1

    this.log('Downloading ' + url)

    progress(
      request(
        {
          uri: url,
          encoding: null
        },
        function (error, response, body) {
          if (error) {
            return console.error('err')
          }
          const updateFile = AppPathFolder + UPDATE_FILE
          const contentType = response.headers['content-type']
          if (contentType && contentType.indexOf('zip') > -1) {
            Updater.log('ZipFilePath: ' + AppPathFolder)
            try {
              const zip = new admZip(body)
              zip.extractAllTo(AppPathFolder, true)
              // Store the update file path
              Updater.update.file = updateFile
              Updater.log('Updater.update.file: ' + updateFile)
              // Success
              Updater.log('Update Zip downloaded: ' + AppPathFolder)
              // Apply the update
              if (updateSha1) {
                try {
                  const buffer = FileSystem.readFileSync(updateFile)
                  const sha1 = Updater.sha1(buffer)
                  if (sha1 !== updateSha1) {
                    Updater.log('Upload failed! Sha1 code mismatch.')
                    Updater.end(5)
                    return false
                  }
                } catch (e) {
                  Updater.log('sha1_error')
                }
              }
              if (process.platform === 'darwin') {
                Updater.apply()
              } else {
                Updater.mvOrMove()
              }
            } catch (error) {
              Updater.log('unzip error: ' + error)
            }
          } else {
            Updater.log('Upload successful!  Server responded with:')
            Updater.log('updateFile: ' + updateFile)

            // Create the file
            FileSystem.writeFile(updateFile, body, null, function (error) {
              if (error) {
                Updater.log(
                  error + '\n Failed to download the update to a local file.'
                )
                Updater.end(5)
                return false
              }

              // Store the update file path
              Updater.update.file = updateFile
              Updater.log('Updater.update.file: ' + updateFile)

              // Success
              Updater.log('Update downloaded: ' + updateFile)

              if (updateSha1) {
                try {
                  const buffer = FileSystem.readFileSync(updateFile)
                  const sha1 = Updater.sha1(buffer)
                  if (sha1 !== updateSha1) {
                    Updater.log('Upload failed! Sha1 code mismatch.')
                    Updater.end(5)
                    return false
                  }
                } catch (e) {
                  Updater.log('sha1_error')
                }
              }

              // Apply the update
              if (process.platform === 'darwin') {
                Updater.apply()
              } else {
                Updater.mvOrMove()
              }
            })
          }
        }
      ),
      {
        throttle: 500 // Throttle the progress event to 500ms, defaults to 1000ms
        // delay: 1000,                       // Only start to emit after 1000ms delay, defaults to 0ms
        // lengthHeader: 'x-transfer-length'  // Length header to use, defaults to content-length
      }
    )
      .on('progress', function (state) {
        // The state is an object that looks like this:
        // {
        //     percent: 0.5,               // Overall percent (between 0 to 1)
        //     speed: 554732,              // The download speed in bytes/sec
        //     size: {
        //         total: 90044871,        // The total payload size in bytes
        //         transferred: 27610959   // The transferred payload size in bytes
        //     },
        //     time: {
        //         elapsed: 36.235,        // The total elapsed seconds since the start (3 decimals)
        //         remaining: 81.403       // The remaining seconds to finish (3 decimals)
        //     }
        // }
        if (Updater.setup.progresscallback) {
          Updater.setup.progresscallback(state)
        }
      })
      .on('error', function (err) {
        // Do something with err
        Updater.log('Do something with err', err)
      })
      .on('end', function (d) {
        // Do something after request finishes
        Updater.log('Do something after request finishes', d)
      })
  },

  progress: function (callback) {
    if (callback) {
      this.setup.progresscallback = callback
    }
  },

  /**
   * Apply the update, remove app.asar and rename UPDATE_FILE to app.asar
   * */
  apply: function () {
    try {
      this.log('Going to unlink: ' + AppPath.slice(0, -1))

      FileSystem.unlinkSync(AppPath.slice(0, -1))
      this.log('Asar deleted successfully.')
    } catch (error) {
      this.log('Delete error: ' + error)

      // Failure
      this.end(6)
      return false
    }

    try {
      this.log(
        'Going to rename: ' + this.update.file + ' to: ' + AppPath.slice(0, -1)
      )
      FileSystem.renameSync(this.update.file, AppPath.slice(0, -1))
      this.log('Update applied.')

      this.log('End of update.')
      // Success
      this.end()
    } catch (error) {
      this.log('Rename error: ' + error)

      // Failure
      this.end(6)
      return false
    }
  },

  // app.asar is always EBUSY on Windows, so we need to try another
  // way of replacing it. This should get called after the main Electron
  // process has quit. Win32 calls 'move' and other platforms call 'mv'
  mvOrMove: function (child) {
    const updateAsar = AppPathFolder + UPDATE_FILE
    const appAsar = AppPathFolder + 'app.asar'
    let winArgs = ''

    Updater.log('Checking for ' + updateAsar)

    try {
      FileSystem.accessSync(updateAsar)
      try {
        Updater.log(
          'Going to shell out to move: ' + updateAsar + ' to: ' + AppAsar
        )

        const executable = process.execPath
        const { spawn } = require('child_process')
        if (process.platform === 'win32') {
          Updater.log(
            'Going to start the windows updater:' +
              WindowsUpdater +
              ' ' +
              updateAsar +
              ' ' +
              appAsar +
              ' ' +
              executable
          )

          //   try {
          //     fs.writeFileSync(
          //       WindowsUpdater,
          //       fs.readFileSync(
          //         `${AppPathFolder}app.asar/node_modules/${require('./package.json').name}/updater.exe`
          //       )
          //     )
          //   } catch (error) {
          //     Updater.log('Write updater.exe Error: ' + error)
          //   }

          // JSON.stringify() calls mean we're correctly quoting paths with spaces
          winArgs = `${JSON.stringify(WindowsUpdater)} ${JSON.stringify(updateAsar)} ${JSON.stringify(appAsar)} ${JSON.stringify(executable)}`
          Updater.log(winArgs)
          // and the windowsVerbatimArguments options argument, in combination with the /s switch, stops windows stripping quotes from our commandline

          // spawn(`${JSON.stringify(WindowsUpdater)}`,[`${JSON.stringify(updateAsar)}`,`${JSON.stringify(appAsar)}`], {detached: true, windowsVerbatimArguments: true, stdio: 'ignore'})
          // so we have to spawn a cmd shell, which then runs the updater, and leaves a visible window whilst running
          spawn('cmd', ['/s', '/c', '"' + winArgs + '"'], {
            detached: true,
            windowsVerbatimArguments: true,
            stdio: 'ignore'
          })
        } else {
          // here's how we'd do this on Mac/Linux, but on Mac at least, the .asar isn't marked as busy, so the update process above
          // is able to overwrite it.
          spawn('bash', ['-c', ['cd ' + JSON.stringify(AppPathFolder), `mv -f ${UPDATE_FILE} app.asar`, executable].join(' && ')], { detached: true })
        }
        // "Updater.end()" will trigger a callback, exec app.quit() in the callback.
        Updater.end()
      } catch (error) {
        Updater.log('Shelling out to move failed: ' + error)
        Updater.end(6)
      }
    } catch (error) {
      Updater.log("Couldn't see an " + updateAsar + ' error was: ' + error)
    }
  }
}

module.exports = Updater
