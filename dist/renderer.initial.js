'use strict';

var _electron = require('electron');

var _ipcMessage = require('../../dist/constants/ipc-message');

var IPCMessage = _interopRequireWildcard(_ipcMessage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function () {
  var createButton = document.getElementById('create');
  createButton.addEventListener('click', function () {
    _electron.ipcRenderer.send(IPCMessage.CREATE_INITIAL_MEMO);
  });
})();
// TODO: fix path...