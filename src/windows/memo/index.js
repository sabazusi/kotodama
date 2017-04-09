import url from 'url';
import { ipcRenderer } from 'electron';
import * as IPCMessage from '../../constants/ipc-message';

(() => {
  const closeButton = document.getElementById('close');
  const windowId = parseInt(url.parse(location.href, true).query.id, 10);

  closeButton.addEventListener('click', () => ipcRenderer.send(IPCMessage.CLOSE_MEMO, windowId));
})();
