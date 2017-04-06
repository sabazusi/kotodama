import { ipcRenderer } from 'electron';
// TODO: fix path...
//  eslint-disable-next-line
import * as IPCMessage from '../../dist/constants/ipc-message';

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
