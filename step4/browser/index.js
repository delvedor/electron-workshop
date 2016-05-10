'use strict'

const { ipcRenderer: ipc } = require('electron')

ipc.send('async-message', 'async message')
