'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require('electron');

var _ipcMessage = require('../constants/ipc-message');

var IPCMessage = _interopRequireWildcard(_ipcMessage);

var _browserWindow = require('../constants/browser-window');

var _browserWindow2 = _interopRequireDefault(_browserWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Window = function () {
  function Window(id, type) {
    _classCallCheck(this, Window);

    this.id = id;
    var templatePath = void 0;
    if (type === 'initial') {
      this.window = new _electron.BrowserWindow(_browserWindow2.default.INITIAL);
      templatePath = 'file://' + __dirname + '/initial/index.html';
    } else {
      this.window = new _electron.BrowserWindow(_browserWindow2.default.MEMO);
      templatePath = 'file://' + __dirname + '/memo/index.html?id=' + id;
    }
    _electron.ipcMain.on(IPCMessage.MEMO_INITIALIZED, function (event) {
      event.sender.send(IPCMessage.SHOW_MEMO, '');
    });

    this.window.loadURL(templatePath);
  }

  _createClass(Window, [{
    key: 'toggleVisibility',
    value: function toggleVisibility(isVisible) {
      if (isVisible) {
        this.window.show();
      } else {
        this.window.hide();
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.window.destroy();
    }
  }]);

  return Window;
}();

exports.default = Window;