import { app, BrowserWindow } from 'electron';
import windowSize from './constants/browser-window';

app.on('ready', () => {
  const win = new BrowserWindow(windowSize.INITIAL);
  win.show();
});
