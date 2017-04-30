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
  var addButton = document.getElementById('add');
  var closeButton = document.getElementById('close');
  var memo = document.getElementById('memo');
  var memoInput = document.getElementById('memoInput');
  var windowId = parseInt(_url2.default.parse(location.href, true).query.id, 10);
  memoInput.style.display = 'none';

  var toggleMemoStatus = function toggleMemoStatus(isInputActive) {
    memo.style.display = isInputActive ? 'none' : 'block';
    memoInput.style.display = isInputActive ? 'block' : 'none';
    memo.innerHTML = currentText.replace(/\n/g, '<br>') || 'ダブルクリックでメモを入力';
    memoInput.value = currentText;
    if (isInputActive) {
      memoInput.focus();
    } else {
      memo.focus();
    }
  };

  // DOM Events
  memo.addEventListener('dblclick', function () {
    return toggleMemoStatus(true);
  });
  memoInput.addEventListener('change', function (event) {
    currentText = event.currentTarget.value;
    _electron.ipcRenderer.send(IPCMessage.UPDATE_CONTENT, event.currentTarget.value);
  });
  memoInput.addEventListener('blur', function () {
    return toggleMemoStatus(false);
  });
  closeButton.addEventListener('click', function () {
    return _electron.ipcRenderer.send(IPCMessage.CLOSE_MEMO, windowId);
  });
  addButton.addEventListener('click', function () {
    return _electron.ipcRenderer.send(IPCMessage.ADD_MEMO);
  });

  // IPC Events
  _electron.ipcRenderer.on(IPCMessage.SHOW_MEMO, function (event, text) {
    currentText = text;
    memo.innerHTML = text || 'ダブルクリックでメモを入力';
  });

  // start window
  _electron.ipcRenderer.send(IPCMessage.MEMO_INITIALIZED);
})();