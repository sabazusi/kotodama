'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require('electron');

var _ipcMessage = require('../constants/ipc-message');

var IPCMessage = _interopRequireWildcard(_ipcMessage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApplicationWindows = function () {
  function ApplicationWindows() {
    _classCallCheck(this, ApplicationWindows);

    this.initialWindow = null;
    this.memoWindowList = [];
  }

  _createClass(ApplicationWindows, [{
    key: 'initializeEvents',
    value: function initializeEvents() {
      var _this = this;

      _electron.ipcMain.on(IPCMessage.CREATE_INITIAL_MEMO, function () {
        // create memo
        _this.memoWindowList.push();
      });
      _electron.ipcMain.on(IPCMessage.EXIT_APP, function () {
        // create memo
        _electron.app.exit();
      });
    }
  }, {
    key: 'addMemoWindow',
    value: function addMemoWindow() {
      var newMemo = {
        id: '' + new Date().getTime(),
        window: { show: function show() {}, hide: function hide() {}, destroy: function destroy() {} }
      };
      this.memoWindowList.push(newMemo);
      newMemo.window.show();
      return newMemo;
    }
  }, {
    key: 'removeMemoWindow',
    value: function removeMemoWindow(id) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var target = _this2.memoWindowList.find(function (memo) {
          return memo.id === id;
        });
        target.window.hide();
        target.window.destroy();
        _this2.memoWindowList = _this2.memoWindowList.filter(function (memo) {
          return memo.id !== id;
        });
        resolve(id);
      });
    }
  }]);

  return ApplicationWindows;
}();

exports.default = new ApplicationWindows();