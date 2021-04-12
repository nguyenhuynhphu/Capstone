import { fetchAllBookGroup, fetchBookByCategory, fetchCategories, fetchTop } from '@/services/bookgroup';
import { Effect, Reducer } from 'umi';

export interface CategoriesChartState {
  data: any;
  isLoading: boolean;
}

export interface CategoriesChartType {
  namespace: string;
  state: CategoriesChartState;
  effects: {
    fetchData: Effect;
  };
  reducers: {
    isLoading: Reducer;
    loadData: Reducer;
  };
}

const CategoriesChartModel: CategoriesChartType = {
  namespace: 'categorieschart',
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
      const listCategories = yield call(fetchTop, payload);
      var tmp: any = [];
      for (let i = 0; i < listCategories.data.length; i++) {
        const cate = listCategories.data[i];
        var response = yield call(fetchBookByCategory, cate.id);
        tmp.push({
          category: listCategories.data[i].name,
          total: response.meta.totalCount,
        });
      }

      //   const response = yield call(fetchAllBookGroup, payload);
      yield put({
        type: 'loadData',
        payload: tmp,
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

export default CategoriesChartModel;
