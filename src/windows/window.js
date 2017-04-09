// @flow

import { BrowserWindow } from 'electron';
import windowSize from '../constants/browser-window';

export default class Window {
  id: number;
  window: BrowserWindow;
  constructor(id: number, type: string) {
    this.id = id;
    let templatePath;
    if (type === 'initial') {
      this.window = new BrowserWindow(windowSize.INITIAL);
      templatePath = `file://${__dirname}/initial/index.html`;
    } else {
      this.window = new BrowserWindow(windowSize.MEMO);
      templatePath = `file://${__dirname}/memo/index.html?id=${id}`;
    }

    this.window.loadURL(templatePath, { hoge: 123 });
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
