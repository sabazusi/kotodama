'use strict';

var _electron = require('electron');

var _ipcMessage = require('./constants/ipc-message');

var IPCMessage = _interopRequireWildcard(_ipcMessage);

var _windowController = require('./windows/window-controller');

var _windowController2 = _interopRequireDefault(_windowController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

_electron.app.on('ready', function () {
  var windowController = new _windowController2.default();

  // Listen from initialWindow
  _electron.ipcMain.on(IPCMessage.CREATE_INITIAL_MEMO, function () {
    return windowController.addMemoWindow();
  });

  _electron.ipcMain.on(IPCMessage.CLOSE_MEMO, function (event, id) {
    return windowController.closeMemoWindow(id);
  });

  _electron.ipcMain.on(IPCMessage.EXIT_APP, function () {
    return _electron.app.exit();
  });

  windowController.start();
});