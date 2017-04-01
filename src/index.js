import { app, BrowserWindow, ipcMain } from 'electron';
import storage from 'electron-json-storage';
import path from 'path';
import * as IPCMessage from './constants/ipc-message';
import * as Keys from './constants/storage';
import windowSize from './constants/browser-window';

app.on('ready', () => {
  // Listen from initialWindow
  ipcMain.on(IPCMessage.CREATE_INITIAL_MEMO, () => {
  });
  ipcMain.on(IPCMessage.EXIT_APP, () => {
    app.exit();
  });
  const initialWindow = new BrowserWindow(windowSize.INITIAL);
  const memoWindowList = [];

  storage.get(Keys.MEMO_LIST, (error, data) => {
    if (error) throw new Error('Application Initialize Error: please restart application.');
    if (data && data.list) {
      data.list.forEach((memo) => {
        memoWindowList.push(new BrowserWindow({}));
      });
    }
  });

  initialWindow.loadURL(`file://${path.resolve(__dirname, '../')}/templates/initial/index.html`);
  initialWindow.show();
});
