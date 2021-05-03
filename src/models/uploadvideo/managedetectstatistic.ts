import { fetchAllBookGroup, fetchBookByCategory, fetchCategories } from '@/services/bookgroup';
import {
  fetchBookAvailable,
  fetchEarnByMonth,
  fetchLateReturn,
  fetchTotalBorrow,
  fetchTotalReturn,
} from '@/services/manageborrow';
import { fetchAllBookShelf, fetchAllDectection } from '@/services/upload';
import _ from 'lodash';
import moment from 'moment';
import { Effect, Reducer } from 'umi';

export interface ManageDetectStatisticState {
  data: any;
  isLoading: boolean;
}

export interface ManageDetectStatisticType {
  namespace: string;
  state: ManageDetectStatisticState;
  effects: {
    fetchData: Effect;
  };
  reducers: {
    isLoading: Reducer;
    loadData: Reducer;
  };
}

const ManageDetectStatisticModel: ManageDetectStatisticType = {
  namespace: 'managedetectstatistic',
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
        
        totalAvailable: 0,
        totalNotAvailable: 0,
        earnByMonth: 0,
        totalReturn: 0,
        totalBorrow: 0,
        totalLate: 0,

        totalBookShelf: 0,
        totalDetection: 0,
        totalBook: 0,
        mostScannedBookshelf: {},
      };

      const totalBookShelf = yield call(fetchAllBookShelf);
      tmp.totalBookShelf = totalBookShelf.meta.totalCount;

      const totalDetection = yield call(fetchAllDectection, true);
      var result = _(totalDetection.data)
      .groupBy('bookShelfName')
      .map(function (items: any, name) {
        return { day: name, values: items.length };
      })
      .value();


      tmp.totalAvailable = result.length;
      tmp.totalNotAvailable = totalBookShelf.meta.totalCount - result.length;
      tmp.totalBook = tmp.totalAvailable + tmp.totalNotAvailable;
 
      var max: any = result[0];
      result.forEach((compare: any) => {
        if(compare.values > max){
          max = compare;
        }
      });
      tmp.mostScannedBookshelf = max;
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

export default ManageDetectStatisticModel;
