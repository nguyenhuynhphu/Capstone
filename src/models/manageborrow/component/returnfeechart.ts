import { fetchAllBookGroup, fetchBookByCategory, fetchCategories } from '@/services/bookgroup';
import { fetchEarnByMonth } from '@/services/manageborrow';
import { Effect, Reducer } from 'umi';

export interface ReturnfeechartState {
  data: any;
  isLoading: boolean;
}

export interface ReturnfeechartType {
  namespace: string;
  state: ReturnfeechartState;
  effects: {
    fetchData: Effect;
  };
  reducers: {
    isLoading: Reducer;
    loadData: Reducer;
  };
}

const ReturnfeechartModel: ReturnfeechartType = {
  namespace: 'returnfeechart',
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

      const listValue = yield call(fetchEarnByMonth, payload);
      listValue.data.forEach((data: any) => {
        data.returnTime = `${data.returnTime.split('-')[1]}/${data.returnTime.split('-')[0]}`
      });

      //   const response = yield call(fetchAllBookGroup, payload);
      yield put({
        type: 'loadData',
        payload: listValue.data,
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

export default ReturnfeechartModel;
