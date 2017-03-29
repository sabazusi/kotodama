'use strict';

var _electron = require('electron');

var _browserWindow = require('./templates/browser-window');

_electron.app.on('ready', function () {
  var win = new _electron.BrowserWindow(_browserWindow.windowSize.initial);
  win.show();
});