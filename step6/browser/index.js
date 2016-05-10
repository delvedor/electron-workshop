'use strict'
/* global $, closeApp*/

const { ipcRenderer: ipc } = require('electron')

$(document).ready(function () {
  $('input[name="text"]').keyup(function (event) {
    if (event.keyCode === 13) sendText($(this).val())
  })
  $('button[name="closerenderer"]').on('click', closeApp)
  $('button[name="closemain"]').on('click', sendClose)
})

function sendText (text) {
  console.log('send', text)
  ipc.send('text-to-window', text)
}

function sendClose () {
  ipc.send('close-app')
}

ipc.on('text-from-window', (event, arg) => {
  console.log('get', arg)
  $('#textfield').text(arg)
})
