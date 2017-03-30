'use strict';

var _electron = require('electron');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _browserWindow = require('./constants/browser-window');

var _browserWindow2 = _interopRequireDefault(_browserWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.app.on('ready', function () {
  var win = new _electron.BrowserWindow(_browserWindow2.default.INITIAL);
  win.loadURL('file://' + _path2.default.resolve(__dirname, '../') + '/templates/initial/index.html');
  win.show();
});