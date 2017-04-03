'use strict';

var _electron = require('electron');

var _electronJsonStorage = require('electron-json-storage');

var _electronJsonStorage2 = _interopRequireDefault(_electronJsonStorage);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ipcMessage = require('./constants/ipc-message');

var IPCMessage = _interopRequireWildcard(_ipcMessage);

var _storage = require('./constants/storage');

var Keys = _interopRequireWildcard(_storage);

var _browserWindow = require('./constants/browser-window');

var _browserWindow2 = _interopRequireDefault(_browserWindow);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_electron.app.on('ready', function () {
  var memoWindowList = [];

  // Listen from initialWindow
  _electron.ipcMain.on(IPCMessage.CREATE_INITIAL_MEMO, function () {
    var newMemoWindow = new _electron.BrowserWindow(_browserWindow2.default.MEMO);
    memoWindowList.push(newMemoWindow);
    newMemoWindow.loadURL('file://' + _path2.default.resolve(__dirname, '../') + '/templates/memo/index.html');
    newMemoWindow.show();
  });
  _electron.ipcMain.on(IPCMessage.EXIT_APP, function () {
    _electron.app.exit();
  });
  var initialWindow = new _electron.BrowserWindow(_browserWindow2.default.INITIAL);

  _electronJsonStorage2.default.get(Keys.MEMO_LIST, function (error, data) {
    if (error) throw new Error('Application Initialize Error: please restart application.');
    if (data && data.list) {
      data.list.forEach(function (memo) {
        var memoWindow = new _electron.BrowserWindow(_browserWindow2.default.MEMO);
        memoWindow.loadURL('file://' + _path2.default.resolve(__dirname, '../') + '/templates/memo/index.html');
        memoWindowList.push(memoWindow);
      });
    }
  });

  initialWindow.loadURL('file://' + _path2.default.resolve(__dirname, '../') + '/templates/initial/index.html');
  initialWindow.show();
});