'use strict'

// Modules to control application life and the native browser window.
const { app, BrowserWindow } = require('electron')
const { join } = require('path')
const is = require('is-electron')
const globals = require('./main/globals')
const addMenu = require('./main/menu')
// starts internal api
require('./main/ipcManager')

function createMainWindow (window) {
  // Create the browser window.
  globals.mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  // and load the index.html of the app.
  globals.mainWindow.loadURL(join('file://', __dirname, 'browser', 'index.html'))
  addMenu()
  // Open the DevTools.
  // globals.mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  globals.mainWindow.on('closed', function windowClosed () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    globals.mainWindow = null
  })
}

function createTextWindow (window) {
  globals.textWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  globals.textWindow.loadURL(join('file://', __dirname, 'browser', 'text.html'))
  addMenu()
  globals.textWindow.on('closed', function windowClosed () {
    globals.textWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function createWindow () {
  createMainWindow()
  createTextWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function allWindowClosed () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (!is.mac()) app.quit()
})

app.on('activate', function activateWindow () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (globals.mainWindow === null) createMainWindow()
  if (globals.textWindow === null) createTextWindow()
})

