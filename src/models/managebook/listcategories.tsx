import { fetchAllBookGroup, fetchCategories, fetchComments } from '@/services/bookgroup';
import { Effect, Reducer } from 'umi';

export interface ListCategoriesState {
  data: any;
  isLoading: boolean;
}

export interface ListCategoriesType {
  namespace: string;
  state: ListCategoriesState;
  effects: {
    fetchData: Effect;
  };
  reducers: {
    isLoading: Reducer<ListCategoriesState>;
    loadData: Reducer<ListCategoriesState>;
  };
}

const ListCommentsModel: ListCategoriesType = {
  namespace: 'listcategories',
  state: {
    data: [],
    isLoading: false,
  },
  effects: {
    *fetchData({ payload }, { call, put }) {
      yield call(() => {}, payload);
      yield put({
        type: 'isLoading',
        payload: {},
      });

      const response = yield call(fetchCategories, payload);
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
      payload.data.forEach((category: any) => {
        category.key = category.id;
      });

      return {
        ...state,
        data: payload.data,
        isLoading: false
      };
    },
  },
};

export default ListCommentsModel;
