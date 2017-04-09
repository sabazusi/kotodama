'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = require('electron');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MemoWindow = function MemoWindow(memoStatus) {
  _classCallCheck(this, MemoWindow);

  this.window = new _electron.BrowserWindow(memoStatus);
};

exports.default = MemoWindow;