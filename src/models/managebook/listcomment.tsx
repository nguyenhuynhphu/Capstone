import { fetchAllBookGroup, fetchComments } from '@/services/bookgroup';
import { Effect, Reducer } from 'umi';

export interface ListCommentsState {
  data: any;
  isLoading: boolean;
  hasNextPage: boolean;
  current: number;
}

export interface ListCommentsType {
  namespace: string;
  state: ListCommentsState;
  effects: {
    fetchData: Effect;
  };
  reducers: {
    isLoading: Reducer<ListCommentsState>;
    loadData: Reducer<ListCommentsState>;
    resetData: Reducer<ListCommentsState>;
  };
}

const ListCommentsModel: ListCommentsType = {
  namespace: 'listcomments',
  state: {
    data: [],
    isLoading: false,
    hasNextPage: true,
    current: 1,
  },
  effects: {
    *fetchData({ payload }, { call, put }) {
      yield call(() => {}, payload);
      yield put({
        type: 'isLoading',
        payload: {},
      });

      const response = yield call(fetchComments, payload);
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
        hasNextPage: true,
        current: 1,
      };
    },
    isLoading(state, {}) {
      return {
        ...state,
        isLoading: true,
      };
    },
    loadData(state, { payload }) {
      payload.data.forEach((comment: any) => {
        comment.key = comment.id;
      });

      return {
        ...state,
        data: state?.data.concat(payload.data),
        isLoading: false,
        hasNextPage: payload.meta.hasNextPage,
        current: payload.meta.currentPage,
      };
    },
  },
};

export default ListCommentsModel;
