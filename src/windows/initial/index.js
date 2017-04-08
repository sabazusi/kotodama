import { ipcRenderer } from 'electron';
import * as IPCMessage from '../../constants/ipc-message';

(() => {
  const createButton = document.getElementById('create');
  const exitButton = document.getElementById('exit');

  createButton.addEventListener('click', () => {
    ipcRenderer.send(IPCMessage.CREATE_INITIAL_MEMO);
  });
  exitButton.addEventListener('click', () => {
    ipcRenderer.send(IPCMessage.EXIT_APP);
  });
})();
