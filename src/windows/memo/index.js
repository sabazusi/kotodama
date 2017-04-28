import url from 'url';
import { ipcRenderer } from 'electron';
import * as IPCMessage from '../../constants/ipc-message';

(() => {
  let currentText = '';
  const closeButton = document.getElementById('close');
  const memo = document.getElementById('memo');
  const memoInput = document.getElementById('memoInput');
  const windowId = parseInt(url.parse(location.href, true).query.id, 10);
  memoInput.style.display = 'none';
  memo.addEventListener('dblclick', () => {
    memo.style.display = 'none';
    memoInput.style.display = 'block';
    memoInput.value = currentText;
    memoInput.focus();
  });
  memoInput.addEventListener('change', (event) => {
    ipcRenderer.send(IPCMessage.UPDATE_CONTENT, event.currentTarget.value);
  });

  // IPC Events
  closeButton.addEventListener('click', () => ipcRenderer.send(IPCMessage.CLOSE_MEMO, windowId));
  ipcRenderer.on(IPCMessage.SHOW_MEMO, (event, text) => {
    currentText = text;
    memo.innerHTML = text || 'ダブルクリックでメモを入力';
  });

  ipcRenderer.send(IPCMessage.MEMO_INITIALIZED);
})();
