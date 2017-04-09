'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require('electron');

var _browserWindow = require('../constants/browser-window');

var _browserWindow2 = _interopRequireDefault(_browserWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    this.window.loadURL(templatePath, { hoge: 123 });
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