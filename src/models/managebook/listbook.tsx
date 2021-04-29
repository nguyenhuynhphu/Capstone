import { insertBook } from '@/services/book';
import { fetchBooks } from '@/services/bookgroup';
import sendNotification from '@/utils/Notification';
import { Effect, Reducer } from 'umi';

export interface ListBooksState {
  data: any;
  isLoading: boolean;
}

export interface ListBooksType {
  namespace: string;
  state: ListBooksState;
  effects: {
    fetchData: Effect;
    createBook: Effect;
  };
  reducers: {
    isLoading: Reducer;
    loadData: Reducer;
    resetData: Reducer;
  };
}

const ListBooksModel: ListBooksType = {
  namespace: 'listbooks',
  state: {
    data: [],
    isLoading: false,
  },
  effects: {
    *fetchData({ payload }, { call, put }) {
      yield put({
        type: 'isLoading',
        payload: {},
      });

      const response = yield call(fetchBooks, payload);

      yield put({
        type: 'loadData',
        payload: response,
      });
    },
    *createBook({ payload }, { call, put }) {
      const { bookGroupId, inputBooks } = payload;
      var book: any = {
        bookGroupId: bookGroupId,
        barcode: '',
        isDeleted: false,
        isAvailable: true,
        drawerId: null,
      };
      if (inputBooks == 0) {
        sendNotification('Please input quantity upper than 0 to create book !', '', 'warning');
      } else {
        for (let i = 0; i < inputBooks; i++) {
          yield call(insertBook, book);
        }      
      }
    },
  },
  reducers: {
    resetData(state, {}) {
      return {
        data: [],
        isLoading: false,
      };
    },
    isLoading(state, {}) {
      return {
        ...state,
        isLoading: true,
      };
    },
    loadData(state, { payload }) {
      payload.data.forEach((book: any) => {
        book.key = book.barCode;
      });

      return {
        ...state,
        data: payload.data.filter((book: any) => book.isDeleted == false),
        isLoading: false,
      };
    },
  },
};

export default ListBooksModel;
