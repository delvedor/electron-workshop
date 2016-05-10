'use strict'

const electron = require('electron')
const is = require('is-electron')

function closeApp () {
  console.log(is.main() ? 'quit from main' : 'quit from renderer')
  if (is.main()) { // main process
    electron.app.quit()
  } else { // renderer process
    electron.remote.app.quit()
  }
}

is.main() ? exports.closeApp = closeApp : window.closeApp = closeApp
