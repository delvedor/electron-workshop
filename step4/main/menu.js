'use strict'

const { Menu } = require('electron')
const is = require('is-electron')

const template = [{
  label: 'Edit',
  submenu: [{
    label: 'Undo',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: 'Redo',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: 'Cut',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: 'Copy',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: 'Paste',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: 'Select All',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectall'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, focusedWindow) {
      if (focusedWindow) focusedWindow.reload()
    }
  }, {
    label: 'Toggle Full Screen',
    accelerator: (function () {
      return is.mac() ? 'Ctrl+Command+F' : 'F11'
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: (function () {
      return is.mac() ? 'Alt+Command+I' : 'Ctrl+Shift+I'
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) focusedWindow.webContents.toggleDevTools()
    }
  }]
}, {
  label: 'Window',
  role: 'window',
  submenu: [{
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }]
}, {
  label: 'Help',
  role: 'help',
  submenu: [{
    label: 'Web.Is.Art',
    click: function () {
      require('electron').shell.openExternal('https://www.facebook.com/webisart.user.group/')
    }
  }]
}]

module.exports = function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
