'use strict';

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _electron = require('electron');

var _ipcMessage = require('../../constants/ipc-message');

var IPCMessage = _interopRequireWildcard(_ipcMessage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var currentText = '';
  var closeButton = document.getElementById('close');
  var memo = document.getElementById('memo');
  var memoInput = document.getElementById('memoInput');
  var windowId = parseInt(_url2.default.parse(location.href, true).query.id, 10);
  memoInput.style.display = 'none';
  memo.addEventListener('dblclick', function () {
    memo.style.display = 'none';
    memoInput.style.display = 'block';
    memoInput.value = currentText;
    memoInput.focus();
  });
  memoInput.addEventListener('change', function (event) {
    _electron.ipcRenderer.send(IPCMessage.UPDATE_CONTENT, event.currentTarget.value);
  });

  // IPC Events
  closeButton.addEventListener('click', function () {
    return _electron.ipcRenderer.send(IPCMessage.CLOSE_MEMO, windowId);
  });
  _electron.ipcRenderer.on(IPCMessage.SHOW_MEMO, function (event, text) {
    currentText = text;
    memo.innerHTML = text || 'ダブルクリックでメモを入力';
  });

  _electron.ipcRenderer.send(IPCMessage.MEMO_INITIALIZED);
})();