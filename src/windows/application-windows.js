class ApplicationWindows {
  constructor() {
    this.initialWindow = null;
    this.memoWindowList = [];
  }

  addMemoWindow() {
    const newMemo = {
      id: `${new Date().getTime()}`,
      window: { show: () => {}, hide: () => {}, destroy: () => {} },
    };
    this.memoWindowList.push(newMemo);
    newMemo.window.show();
    return newMemo;
  }

  removeMemoWindow(id) {
    return new Promise((resolve) => {
      const target = this.memoWindowList.find(memo => memo.id === id);
      target.window.hide();
      target.window.destroy();
      this.memoWindowList = this.memoWindowList.filter(memo => memo.id !== id);
      resolve(id);
    });
  }
}
export default new ApplicationWindows();
