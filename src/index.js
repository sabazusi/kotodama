import {app, BrowserWindow} from 'electron';
import {windowSize} from './templates/browser-window';

app.on('ready', () => {
  const win = new BrowserWindow(windowSize.initial);
  win.show();
});
