import { ipcRenderer } from 'electron';
// TODO: fix path...
//  eslint-disable-next-line
import * as IPCMessage from '../../dist/constants/ipc-message';

(() => {
  const createButton = document.getElementById('create');
  createButton.addEventListener('click', () => {
    ipcRenderer.send(IPCMessage.CREATE_INITIAL_MEMO);
  });
})();
