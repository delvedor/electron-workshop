const { ipcMain: ipc } = require('electron')
const globals = require('./globals')

ipc.on('text-to-window', (event, arg) => {
  globals.textWindow.webContents.send('text-from-window', arg)
})
