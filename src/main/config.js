const isOsx = process.platform === 'darwin'
const isWindows = process.platform === 'win32'
const isLinux = process.platform === 'linux'
const isDevelopment = process.env.NODE_ENV !== 'production'

export {
  isOsx,
  isWindows,
  isLinux,
  isDevelopment
}
