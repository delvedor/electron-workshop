const { ipcMain: ipc } = require('electron')
const globals = require('./globals')
const { closeApp } = require('../isomorphic')

ipc.on('text-to-window', (event, arg) => {
  globals.textWindow.webContents.send('text-from-window', arg)
})

ipc.on('close-app', (event, arg) => {
  closeApp()
})
