"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApplicationWindows = function () {
  function ApplicationWindows() {
    _classCallCheck(this, ApplicationWindows);

    this.initialWindow = null;
    this.memoWindowList = [];
  }

  _createClass(ApplicationWindows, [{
    key: "addMemoWindow",
    value: function addMemoWindow() {
      var newMemo = {
        id: "" + new Date().getTime(),
        window: { show: function show() {}, hide: function hide() {}, destroy: function destroy() {} }
      };
      this.memoWindowList.push(newMemo);
      newMemo.window.show();
      return newMemo;
    }
  }, {
    key: "removeMemoWindow",
    value: function removeMemoWindow(id) {
      var _this = this;

      return new Promise(function (resolve) {
        var target = _this.memoWindowList.find(function (memo) {
          return memo.id === id;
        });
        target.window.hide();
        target.window.destroy();
        _this.memoWindowList = _this.memoWindowList.filter(function (memo) {
          return memo.id !== id;
        });
        resolve(id);
      });
    }
  }]);

  return ApplicationWindows;
}();

exports.default = new ApplicationWindows();