import { fetchAllBookGroup, fetchBookByCategory, fetchCategories } from '@/services/bookgroup';
import { fetchBookAvailable, fetchEarnByMonth, fetchLateReturn, fetchTotalBorrow, fetchTotalReturn } from '@/services/manageborrow';
import moment from 'moment';
import { Effect, Reducer } from 'umi';

export interface ManageBorrowStatisticState {
  data: any;
  isLoading: boolean;
}

export interface ManageBorrowStatisticType {
  namespace: string;
  state: ManageBorrowStatisticState;
  effects: {
    fetchData: Effect;
  };
  reducers: {
    isLoading: Reducer;
    loadData: Reducer;
  };
}

const ManageBorrowStatisticModel: ManageBorrowStatisticType = {
  namespace: 'manageborrowstatistic',
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
      var tmp: any = {
          totalBook: 0,
          totalAvailable: 0,
          totalNotAvailable: 0,
          earnByMonth: 0,
          totalReturn: 0,
          totalBorrow: 0,
          totalLate: 0
      };
      const totalAvailable = yield call(fetchBookAvailable, true);
      tmp.totalAvailable = totalAvailable.meta.totalCount;
      const totalNotAvailable = yield call(fetchBookAvailable, false);
      tmp.totalNotAvailable = totalNotAvailable.meta.totalCount;

      tmp.totalBook = tmp.totalAvailable + tmp.totalNotAvailable;

      const earnByMonth = yield call(fetchEarnByMonth, false);
      var value = 0;
      earnByMonth.data.forEach((earing: any) => {
        if(moment(earing.returnTime).diff(moment(), 'months') == 0){
          value = earing.fee;
        }
      });
   
      tmp.earnByMonth = value;
      const totalReturn = yield call(fetchTotalReturn, false);
      tmp.totalReturn = totalReturn.meta.totalCount;
      const totalBorrow = yield call(fetchTotalBorrow, false);
      tmp.totalBorrow = totalBorrow.meta.totalCount;
      const totalLate = yield call(fetchLateReturn, false);
      tmp.totalLate = totalLate.meta.totalCount;
      
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

export default ManageBorrowStatisticModel;
