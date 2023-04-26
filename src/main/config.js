const isOsx = process.platform === 'darwin'
const isWindows = process.platform === 'win32'
const isLinux = process.platform === 'linux'

module.exports = {
  isOsx,
  isWindows,
  isLinux
}
