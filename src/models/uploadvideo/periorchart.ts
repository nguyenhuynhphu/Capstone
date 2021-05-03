import { fetchAllBookGroup, fetchBookByCategory, fetchCategories } from '@/services/bookgroup';
import { fetchAllDectection } from '@/services/upload';
import _ from 'lodash';
import { Effect, Reducer } from 'umi';

export interface PeriorChartState {
  data: any;
  isLoading: boolean;
}

export interface PeriorChartType {
  namespace: string;
  state: PeriorChartState;
  effects: {
    fetchData: Effect;
  };
  reducers: {
    isLoading: Reducer;
    loadData: Reducer;
  };
}

const PeriorChartModel: PeriorChartType = {
  namespace: 'periorchart',
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
      const listDetections = yield call(fetchAllDectection, payload);
      var tmp: any = [];
      for (let i = 0; i < listDetections.data.length; i++) {
        const detection = listDetections.data[i];

        tmp.push({
          day: detection.time.split('T')[0],
          value: 1,
        });
      }
      var result = _(tmp)
        .groupBy('day')
        .map(function (items: any, name) {
          return { day: name, value: items.length };
        })
        .value();
 

      //   const response = yield call(fetchAllBookGroup, payload);
      yield put({
        type: 'loadData',
        payload: result,
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

export default PeriorChartModel;
