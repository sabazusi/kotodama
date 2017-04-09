import { app, ipcMain } from 'electron';
import * as IPCMessage from './constants/ipc-message';
import WindowController from './windows/window-controller';

app.on('ready', () => {
  const windowController = new WindowController();

  // Listen from initialWindow
  ipcMain.on(IPCMessage.CREATE_INITIAL_MEMO, () => windowController.addMemoWindow());
  ipcMain.on(IPCMessage.EXIT_APP, () => app.exit());

  windowController.start();
});
