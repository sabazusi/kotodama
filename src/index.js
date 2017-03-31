import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import * as IPCMessage from './constants/ipc-message';
import windowSize from './constants/browser-window';

app.on('ready', () => {
  ipcMain.on(IPCMessage.CREATE_INITIAL_MEMO, () => {
    console.log('create');
  });
  const win = new BrowserWindow(windowSize.INITIAL);
  win.loadURL(`file://${path.resolve(__dirname, '../')}/templates/initial/index.html`);
  win.show();
});
