'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restore = exports.save = undefined;

var _electronJsonStorage = require('electron-json-storage');

var _electronJsonStorage2 = _interopRequireDefault(_electronJsonStorage);

var _storage = require('../constants/storage');

var StorageKeys = _interopRequireWildcard(_storage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var save = exports.save = function save() {};

var restore = exports.restore = function restore(callback) {
  _electronJsonStorage2.default.get(StorageKeys.MEMO_LIST, function (error, data) {
    if (error) throw new Error('Storage access error! Please restart application.');
    callback(data.memoList ? data : { memoList: [{ content: 'ha' }] });
  });
};