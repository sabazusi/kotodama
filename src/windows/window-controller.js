// @flow

import { app, ipcMain } from 'electron';
import { restore } from '../utils/storage';
import * as IPCMessage from '../constants/ipc-message';
import Window from './window';
import type { Data, MemoData } from '../utils/storage';

const WINDOW_TYPE = {
  INITIAL: 'initial',
  MEMO: 'memo',
};

export default class ApplicationWindows {
  initialWindow: Window;
  memoWindowList: Array<Window>;
  memoWindowDataCache: Array<MemoData>;
  constructor() {
    this.initialWindow = new Window(0, WINDOW_TYPE.INITIAL);
    this.memoWindowList = [];
    this.memoWindowDataCache = [];

    // restore windows from local storage
    restore((data: Data) => this.memoWindowDataCache = data.memoList);
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
    this.memoWindowList.push(new Window(
      new Date().getTime(),
      WINDOW_TYPE.MEMO,
      '',
    ));
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

  onUpdateMemoContent = (id: number, content: string) => {
    this.memoWindowDataCache = this.memoWindowDataCache.map((memo) => {
      memo.id === id ? { id, content } : memo;
    });
  };

  closeMemoWindow(id: number) {
    const target = this.memoWindowList.find(memo => memo.id === id);
    if (target) {
      target.destroy();
      this.memoWindowList = this.memoWindowList.filter(memo => memo.id !== id);
      this.toggleWindowsVisibility();
    }
  }
}
