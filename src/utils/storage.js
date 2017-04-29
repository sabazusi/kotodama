// @flow

import storage from 'electron-json-storage';
import * as StorageKeys from '../constants/storage';

const memoDataCache = [];

export type MemoData = {
  id: number;
  content: string;
};
export type Data = {
  memoList: Array<MemoData>;
};

export default class Storage {
  dataCache: Data;

  constructor() {
    this.dataCache = { memoList: [] };
  }

  saveMemo(id: number, content: string) {
    const targetIndex = this.dataCache.memoList.findIndex((memo: MemoData) => memo.id === id);
    if (targetIndex > -1) {
      this.dataCache.memoList[targetIndex] = { id, content };
    } else {
      this.dataCache.memoList.push({ id, content });
    }
    storage.set(StorageKeys.MEMO_LIST, this.dataCache);
  }

  removeMemo(id: number) {
    this.dataCache.memoList = this.dataCache.memoList.filter((memo: MemoData) => memo.id !== id);
    storage.set(StorageKeys.MEMO_LIST, this.dataCache);
  }

  restore(callback: (data: Data) => void) {
    storage.get(StorageKeys.MEMO_LIST, (error, data: Data) => {
      if (error) throw new Error('Storage access error! Please restart application.');
      this.dataCache = data.memoList ? data : { memoList: [] };
      callback(this.dataCache);
    });
  }
}
