// @flow

export type MemoData = {
  id: number;
  content: string;
};
export type Data = {
  memoList: Array<MemoData>;
};

export type RendererEvent = {
  sender: {
    send: (type: string, ...args: *) => void;
  }
};
