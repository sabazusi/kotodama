// @flow

import { ipcMain, BrowserWindow } from 'electron';
import * as IPCMessage from '../constants/ipc-message';
import windowSize from '../constants/browser-window';

type RendererEvent = {
  sender: {
    send: (type: string, ...args: *) => void;
  }
};

export default class Window {
  id: number;
  window: BrowserWindow;
  content: string;
  onChange: (id: number, content: string) => void;

  constructor(id: number, type: string, content: string = '', onChangeContent: (id: number, content: string) => void = () => {}) {
    this.id = id;
    this.content = content;
    this.onChange = onChangeContent;
    let templatePath;
    if (type === 'initial') {
      this.window = new BrowserWindow(windowSize.INITIAL);
      templatePath = `file://${__dirname}/initial/index.html`;
    } else {
      this.window = new BrowserWindow(windowSize.MEMO);
      templatePath = `file://${__dirname}/memo/index.html?id=${id}`;
    }
    ipcMain.on(IPCMessage.MEMO_INITIALIZED, (event: RendererEvent) => {
      event.sender.send(IPCMessage.SHOW_MEMO, this.content);
    });

    ipcMain.on(IPCMessage.UPDATE_CONTENT, (event: RendererEvent, content: string) => {
      this.updateMemoContent(content);
    });

    this.window.loadURL(templatePath);
  }

  updateMemoContent(content: string) {
    this.content = content;
    this.onChange(this.id, this.content);
  }

  toggleVisibility(isVisible: boolean) {
    if (isVisible) {
      this.window.show();
    } else {
      this.window.hide();
    }
  }

  destroy() {
    this.window.destroy();
  }
}
