import url from 'url';
import { ipcRenderer } from 'electron';
import * as IPCMessage from '../../constants/ipc-message';

(() => {
  const closeButton = document.getElementById('close');
  const memo = document.getElementById('memo');
  const memoInput = document.getElementById('memoInput');
  const windowId = parseInt(url.parse(location.href, true).query.id, 10);
  memoInput.style.display = 'none';
  memo.addEventListener('dblclick', () => {
    memo.style.display = 'none';
    memoInput.style.display = 'block';
  });
  // IPC Events
  closeButton.addEventListener('click', () => ipcRenderer.send(IPCMessage.CLOSE_MEMO, windowId));
  ipcRenderer.on(IPCMessage.SHOW_MEMO, (event, text) => {
    memo.innerHTML = text || 'ここにメモを入力してください';
  });

  ipcRenderer.send(IPCMessage.MEMO_INITIALIZED);
})();
