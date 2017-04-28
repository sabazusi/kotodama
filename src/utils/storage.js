// @flow

import storage from 'electron-json-storage';
import * as StorageKeys from '../constants/storage';

export type MemoData = {
  id: number;
  content: string;
};
export type Data = {
  memoList: Array<MemoData>;
};

export const save = () => {
};

export const restore = (callback: (data: Data) => void) => {
  storage.get(StorageKeys.MEMO_LIST, (error, data: Data) => {
    if (error) throw new Error('Storage access error! Please restart application.');
    callback(data.memoList ? data : { memoList: [] });
  });
};
