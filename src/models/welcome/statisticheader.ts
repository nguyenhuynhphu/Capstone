import { fetchAllDectection } from '@/services/upload';
import { fetchPatronBorrow, fetchPatronReturn } from '@/services/welcome';
import _ from 'lodash';
import { Effect, Reducer } from 'umi';

export interface StatisticHeaderState {
  //   data: any;
  isLoading: boolean;
  patronActive: any;
  returnToday: any;
}

export interface StatisticHeaderType {
  namespace: string;
  state: StatisticHeaderState;
  effects: {
    fetchPatronActivities: Effect;
    fetchReturnToday: Effect;
  };
  reducers: {
    render: Reducer;
    renderReturn: Reducer;
    isLoading: Reducer;
    //loadData: Reducer;
  };
}

const StatisticHeaderModel: StatisticHeaderType = {
  namespace: 'statisticheader',
  state: {
    patronActive: [],
    returnToday: [],
    isLoading: false,
  },
  effects: {
    *fetchPatronActivities({ payload }, { call, put }) {
      yield put({
        type: 'isLoading',
        payload: {},
      });
      var listBorrow = yield call(fetchPatronBorrow, payload);
      //   const response = yield call(fetchAllBookGroup, payload);
      yield put({
        type: 'render',
        payload: listBorrow.data,
      });
    },
    *fetchReturnToday({ payload }, { call, put }) {
      yield put({
        type: 'isLoading',
        payload: {},
      });
      var listReturn = yield call(fetchPatronReturn, payload);
      //   const response = yield call(fetchAllBookGroup, payload);
      yield put({
        type: 'renderReturn',
        payload: listReturn.data,
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

    render(state, { payload }) {
      return {
        ...state,
        patronActive: payload,
        isLoading: false,
      };
    },
    renderReturn(state, { payload }) {
      return {
        ...state,
        returnToday: payload,
        isLoading: false,
      };
    },
  },
};

export default StatisticHeaderModel;
