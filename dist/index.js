'use strict';

var _electron = require('electron');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ipcMessage = require('./constants/ipc-message');

var IPCMessage = _interopRequireWildcard(_ipcMessage);

var _browserWindow = require('./constants/browser-window');

var _browserWindow2 = _interopRequireDefault(_browserWindow);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.app.on('ready', function () {
  _electron.ipcMain.on(IPCMessage.CREATE_INITIAL_MEMO, function () {
    console.log('create');
  });
  var win = new _electron.BrowserWindow(_browserWindow2.default.INITIAL);
  win.loadURL('file://' + _path2.default.resolve(__dirname, '../') + '/templates/initial/index.html');
  win.show();
});