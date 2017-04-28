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
    const memoDataCache = this.dataCache.memoList.map((memo: MemoData) => memo.id === id ? { id, content } : memo);
    storage.set(StorageKeys.MEMO_LIST, { memoList: memoDataCache });
    console.log('save');
  }

  restore(callback: (data: Data) => void) {
    storage.get(StorageKeys.MEMO_LIST, (error, data: Data) => {
      if (error) throw new Error('Storage access error! Please restart application.');
      this.dataCache = data.memoList ? data : { memoList: [] };
      callback(this.dataCache);
    });
  }
}
