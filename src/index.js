import { app, BrowserWindow, ipcMain } from 'electron';
import storage from 'electron-json-storage';
import path from 'path';
import * as IPCMessage from './constants/ipc-message';
import * as Keys from './constants/storage';
import windowSize from './constants/browser-window';

app.on('ready', () => {
  const memoWindowList = [];

  // Listen from initialWindow
  ipcMain.on(IPCMessage.CREATE_INITIAL_MEMO, () => {
    const newMemoWindow = new BrowserWindow(windowSize.MEMO);
    memoWindowList.push(newMemoWindow);
    newMemoWindow.loadURL(`file://${__dirname}/windows/memo/index.html`);
    newMemoWindow.show();
  });
  ipcMain.on(IPCMessage.EXIT_APP, () => {
    app.exit();
  });
  const initialWindow = new BrowserWindow(windowSize.INITIAL);

  storage.get(Keys.MEMO_LIST, (error, data) => {
    if (error) throw new Error('Application Initialize Error: please restart application.');
    if (data && data.list) {
      data.list.forEach(() => {
        const memoWindow = new BrowserWindow(windowSize.MEMO);
        memoWindow.loadURL(`file://${__dirname}/windows/memo/index.html`);
        memoWindowList.push(memoWindow);
      });
    }
  });

  initialWindow.loadURL(`file://${__dirname}/windows/initial/index.html`);
  initialWindow.show();
});
