import url from 'url';
import { ipcRenderer } from 'electron';
import * as IPCMessage from '../../constants/ipc-message';

(() => {
  const closeButton = document.getElementById('close');
  const memo = document.getElementById('memo');
  const memoInput = document.getElementById('memoInput');
  const windowId = parseInt(url.parse(location.href, true).query.id, 10);
  memo.innerHTML = 'ここにメモを入力してください';
  memoInput.style.display = 'none';
  closeButton.addEventListener('click', () => ipcRenderer.send(IPCMessage.CLOSE_MEMO, windowId));
  memo.addEventListener('dblclick', () => {
    memo.style.display = 'none';
    memoInput.style.display = 'block';
  });
})();
