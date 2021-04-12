import { fetchAllDectection } from '@/services/upload';
import { fetchCustomerBorrow, fetchCustomerReturn } from '@/services/welcome';
import _ from 'lodash';
import { Effect, Reducer } from 'umi';

export interface StatisticHeaderState {
  //   data: any;
  isLoading: boolean;
  customerActive: any;
  returnToday: any;
}

export interface StatisticHeaderType {
  namespace: string;
  state: StatisticHeaderState;
  effects: {
    fetchCustomerActivities: Effect;
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
    customerActive: [],
    returnToday: [],
    isLoading: false,
  },
  effects: {
    *fetchCustomerActivities({ payload }, { call, put }) {
      yield put({
        type: 'isLoading',
        payload: {},
      });
      var listBorrow = yield call(fetchCustomerBorrow, payload);
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
      var listReturn = yield call(fetchCustomerReturn, payload);
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
        customerActive: payload,
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
