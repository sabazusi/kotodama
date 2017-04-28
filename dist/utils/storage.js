'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electronJsonStorage = require('electron-json-storage');

var _electronJsonStorage2 = _interopRequireDefault(_electronJsonStorage);

var _storage = require('../constants/storage');

var StorageKeys = _interopRequireWildcard(_storage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var memoDataCache = [];

var Storage = function () {
  function Storage() {
    _classCallCheck(this, Storage);

    this.dataCache = { memoList: [] };
  }

  _createClass(Storage, [{
    key: 'saveMemo',
    value: function saveMemo(id, content) {
      var memoDataCache = this.dataCache.memoList.map(function (memo) {
        return memo.id === id ? { id: id, content: content } : memo;
      });
      _electronJsonStorage2.default.set(StorageKeys.MEMO_LIST, { memoList: memoDataCache });
      console.log('save');
    }
  }, {
    key: 'restore',
    value: function restore(callback) {
      var _this = this;

      _electronJsonStorage2.default.get(StorageKeys.MEMO_LIST, function (error, data) {
        if (error) throw new Error('Storage access error! Please restart application.');
        _this.dataCache = data.memoList ? data : { memoList: [] };
        callback(_this.dataCache);
      });
    }
  }]);

  return Storage;
}();

exports.default = Storage;