import { fetchAllBookGroup, fetchComments, removeComment } from '@/services/bookgroup';
import { Effect, Reducer } from 'umi';

export interface ListCommentsState {
  data: any;
  isLoading: boolean;
}

export interface ListCommentsType {
  namespace: string;
  state: ListCommentsState;
  effects: {
    fetchData: Effect;
    removeFeedback: Effect;
  };
  reducers: {
    isLoading: Reducer;
    loadData: Reducer;
    resetData: Reducer;
  };
}

const ListCommentsModel: ListCommentsType = {
  namespace: 'listcomments',
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

      const response = yield call(fetchComments, payload);
      yield put({
        type: 'loadData',
        payload: response,
      });
    },
    *removeFeedback({ payload }, { call, put }) {
      const response = yield call(removeComment, payload);
      
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
        data: payload.data,
        isLoading: false,
        
      };
    },
  },
};

export default ListCommentsModel;
