// @flow

import { app, ipcMain } from 'electron';
import Storage from '../utils/storage';
import * as IPCMessage from '../constants/ipc-message';
import Window from './window';
import type { Data } from '../utils/storage';

const WINDOW_TYPE = {
  INITIAL: 'initial',
  MEMO: 'memo',
};

export default class ApplicationWindows {
  initialWindow: Window;
  memoWindowList: Array<Window>;
  storage: Storage;
  constructor() {
    this.initialWindow = new Window(0, WINDOW_TYPE.INITIAL);
    this.memoWindowList = [];
    this.storage = new Storage();

    // restore windows from local storage
    this.storage.restore((data: Data) => {
      data.memoList.map(memo => this.memoWindowList.push(new Window(
        memo.id,
        WINDOW_TYPE.MEMO,
        memo.content,
        this.onUpdateMemoContent.bind(this),
      )));
    });
  }

  initializeEvents() {
    ipcMain.on(IPCMessage.CREATE_INITIAL_MEMO, () => {
      // create memo
      this.memoWindowList.push();
    });
    ipcMain.on(IPCMessage.EXIT_APP, () => {
      // create memo
      app.exit();
    });
  }

  start() {
    setTimeout(() => this.toggleWindowsVisibility(), 1000);
  }

  addMemoWindow() {
    const newId = new Date().getTime();
    this.memoWindowList.push(new Window(
      newId,
      WINDOW_TYPE.MEMO,
      '',
      this.onUpdateMemoContent.bind(this),
    ));
    this.storage.saveMemo(newId, '');
    this.toggleWindowsVisibility();
  }

  toggleWindowsVisibility() {
    if (this.memoWindowList.length > 0) {
      this.initialWindow.toggleVisibility(false);
      this.memoWindowList.forEach(memoWindow => memoWindow.toggleVisibility(true));
    } else {
      this.initialWindow.toggleVisibility(true);
      this.memoWindowList.forEach(memoWindow => memoWindow.toggleVisibility(false));
    }
  }

  onUpdateMemoContent(id: number, content: string) {
    this.storage.saveMemo(id, content);
  }

  closeMemoWindow(id: number) {
    const target = this.memoWindowList.find(memo => memo.id === id);
    if (target) {
      target.destroy();
      this.memoWindowList = this.memoWindowList.filter(memo => memo.id !== id);
      this.toggleWindowsVisibility();
    }
    this.storage.removeMemo(id);
  }
}
