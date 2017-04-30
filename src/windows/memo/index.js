import url from 'url';
import { ipcRenderer } from 'electron';
import * as IPCMessage from '../../constants/ipc-message';

(() => {
  let currentText = '';
  const addButton = document.getElementById('add');
  const closeButton = document.getElementById('close');
  const memo = document.getElementById('memo');
  const memoInput = document.getElementById('memoInput');
  const windowId = parseInt(url.parse(location.href, true).query.id, 10);
  memoInput.style.display = 'none';

  const toggleMemoStatus = (isInputActive) => {
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
  memo.addEventListener('dblclick', () => toggleMemoStatus(true));
  memoInput.addEventListener('change', (event) => {
    currentText = event.currentTarget.value;
    ipcRenderer.send(IPCMessage.UPDATE_CONTENT, event.currentTarget.value);
  });
  memoInput.addEventListener('blur', () => toggleMemoStatus(false));
  closeButton.addEventListener('click', () => ipcRenderer.send(IPCMessage.CLOSE_MEMO, windowId));
  addButton.addEventListener('click', () => ipcRenderer.send(IPCMessage.ADD_MEMO));

  // IPC Events
  ipcRenderer.on(IPCMessage.SHOW_MEMO, (event, text) => {
    currentText = text;
    memo.innerHTML = text || 'ダブルクリックでメモを入力';
  });

  // start window
  ipcRenderer.send(IPCMessage.MEMO_INITIALIZED);
})();
