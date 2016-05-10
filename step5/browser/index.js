'use strict'
/* global $ */

const { ipcRenderer: ipc } = require('electron')

$(document).ready(function () {
  $('input[name="text"]').keyup(function (event) {
    if (event.keyCode === 13) send($(this).val())
  })
})

function send (text) {
  console.log('send', text)
  ipc.send('text-to-window', text)
}

ipc.on('text-from-window', (event, arg) => {
  console.log('get', arg)
  $('#textfield').text(arg)
})
