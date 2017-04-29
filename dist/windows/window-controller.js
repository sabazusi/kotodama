'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require('electron');

var _storage = require('../utils/storage');

var _storage2 = _interopRequireDefault(_storage);

var _ipcMessage = require('../constants/ipc-message');

var IPCMessage = _interopRequireWildcard(_ipcMessage);

var _window = require('./window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WINDOW_TYPE = {
  INITIAL: 'initial',
  MEMO: 'memo'
};

var ApplicationWindows = function () {
  function ApplicationWindows() {
    var _this = this;

    _classCallCheck(this, ApplicationWindows);

    this.initialWindow = new _window2.default(0, WINDOW_TYPE.INITIAL);
    this.memoWindowList = [];
    this.storage = new _storage2.default();
    this.initializeEvents();

    // restore windows from local storage
    this.storage.restore(function (data) {
      data.memoList.map(function (memo) {
        return _this.memoWindowList.push(new _window2.default(memo.id, WINDOW_TYPE.MEMO, memo.content, _this.onUpdateMemoContent.bind(_this)));
      });
    });
  }

  _createClass(ApplicationWindows, [{
    key: 'initializeEvents',
    value: function initializeEvents() {
      var _this2 = this;

      _electron.ipcMain.on(IPCMessage.ADD_MEMO, function () {
        return _this2.addMemoWindow();
      });
      _electron.ipcMain.on(IPCMessage.EXIT_APP, function () {
        return _electron.app.exit();
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var _this3 = this;

      setTimeout(function () {
        return _this3.toggleWindowsVisibility();
      }, 1000);
    }
  }, {
    key: 'addMemoWindow',
    value: function addMemoWindow() {
      var newId = new Date().getTime();
      this.memoWindowList.push(new _window2.default(newId, WINDOW_TYPE.MEMO, '', this.onUpdateMemoContent.bind(this)));
      this.storage.saveMemo(newId, '');
      this.toggleWindowsVisibility();
    }
  }, {
    key: 'toggleWindowsVisibility',
    value: function toggleWindowsVisibility() {
      if (this.memoWindowList.length > 0) {
        this.initialWindow.toggleVisibility(false);
        this.memoWindowList.forEach(function (memoWindow) {
          return memoWindow.toggleVisibility(true);
        });
      } else {
        this.initialWindow.toggleVisibility(true);
        this.memoWindowList.forEach(function (memoWindow) {
          return memoWindow.toggleVisibility(false);
        });
      }
    }
  }, {
    key: 'onUpdateMemoContent',
    value: function onUpdateMemoContent(id, content) {
      this.storage.saveMemo(id, content);
    }
  }, {
    key: 'closeMemoWindow',
    value: function closeMemoWindow(id) {
      var target = this.memoWindowList.find(function (memo) {
        return memo.id === id;
      });
      if (target) {
        target.destroy();
        this.memoWindowList = this.memoWindowList.filter(function (memo) {
          return memo.id !== id;
        });
        this.toggleWindowsVisibility();
      }
      this.storage.removeMemo(id);
    }
  }]);

  return ApplicationWindows;
}();

exports.default = ApplicationWindows;