import { fetchAllBookGroup, fetchNewestBookGroup } from '@/services/bookgroup';
import { Effect, Reducer } from 'umi';

export interface NewBookListState {
  data: any;
  isLoading: boolean;
}

export interface NewBookListStateType {
  namespace: string;
  state: NewBookListState;
  effects: {
    fetchData: Effect;
  };
  reducers: {
    isLoading: Reducer;
    loadData: Reducer;
  };
}

const NewBookListModel: NewBookListStateType = {
  namespace: 'newbooklist',
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

      const response = yield call(fetchNewestBookGroup, payload);
      yield put({
        type: 'loadData',
        payload: response.data,
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
      return {
        ...state,
        data: payload,
        isLoading: false,
      };
    },
  },
};

export default NewBookListModel;
