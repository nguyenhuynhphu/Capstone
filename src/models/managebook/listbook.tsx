import { fetchBooks } from '@/services/bookgroup';
import { Effect, Reducer } from 'umi';

export interface ListBooksState {
  data: any;
  isLoading: boolean;
  hasNextPage: boolean;
}

export interface ListBooksType {
  namespace: string;
  state: ListBooksState;
  effects: {
    fetchData: Effect;
  };
  reducers: {
    isLoading: Reducer<ListBooksState>;
    loadData: Reducer<ListBooksState>;
    resetData: Reducer<ListBooksState>;
  };
}

const ListBooksModel: ListBooksType = {
  namespace: 'listbooks',
  state: {
    data: [],
    isLoading: false,
    hasNextPage: true,
  },
  effects: {
    *fetchData({ payload }, { call, put }) {
      yield call(() => {}, payload);
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
        book.key = book.id;
      });
      console.log('FETCH DATA >> ', payload);

      return {
        ...state,
        data: state?.data.concat(payload.data),
        isLoading: false,
        hasNextPage: payload.meta.hasNextPage
      };
    },
  },
};

export default ListBooksModel;
