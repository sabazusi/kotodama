import { app, BrowserWindow } from 'electron';
import path from 'path';
import windowSize from './constants/browser-window';

app.on('ready', () => {
  const win = new BrowserWindow(windowSize.INITIAL);
  win.loadURL(`file://${path.resolve(__dirname, '../')}/templates/initial/index.html`);
  win.show();
});
