import { fetchDisableBook } from '@/services/book';
import { fetchBooks } from '@/services/bookgroup';
import { Effect, Reducer } from 'umi';

export interface DisableBookState {
  data: any;
  isLoading: boolean;
}

export interface DisableBookType {
  namespace: string;
  state: DisableBookState;
  effects: {
    fetchData: Effect;
  };
  reducers: {
    isLoading: Reducer;
    loadData: Reducer;
  };
}

const DisableBookModel: DisableBookType = {
  namespace: 'disablebook',
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

      const response = yield call(fetchDisableBook, payload);
      
      yield put({
        type: 'loadData',
        payload: response,
      });
    },
  },
  reducers: {
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
        data: payload.data,
        isLoading: false,
      };
    },
  },
};

export default DisableBookModel;
