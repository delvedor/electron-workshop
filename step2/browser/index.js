'use strict'

const { ipcRenderer: ipc } = require('electron')

ipc.send('async-message', 'async message')

ipc.on('async-reply', (event, arg) => {
  console.log(arg)
})

let msg = ipc.sendSync('sync-message', 'sync message')
console.log(msg)
