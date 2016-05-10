'use strict'

// Modules to control application life and the native browser window.
const { app, BrowserWindow, ipcMain: ipc } = require('electron')
const { join } = require('path')
const is = require('is-electron')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  // and load the index.html of the app.
  mainWindow.loadURL(join('file://', __dirname, 'browser', 'index.html'))
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('finish-load', 'Good morning my dear!')
  })

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function windowClosed () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function allWindowClosed () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (!is.mac()) {
    app.quit()
  }
})

app.on('activate', function activateWindow () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('async-message', (event, arg) => {
  console.log(arg)
  event.sender.send('async-reply', 'async reply')
})

ipc.on('sync-message', (event, arg) => {
  console.log(arg)
  event.returnValue = 'sync reply'
})

setTimeout(() => {
  mainWindow.webContents.send('message-from-main', 'Hey, I\'m the main!')
}, 3000)
