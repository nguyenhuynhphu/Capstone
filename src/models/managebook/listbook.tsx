import { fetchBooks } from '@/services/bookgroup';
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
