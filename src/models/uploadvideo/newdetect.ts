import { fetchAllBookGroup, fetchBookByCategory, fetchCategories } from '@/services/bookgroup';
import { fetchAllDectection, fetchNewestDetect, fetchTrackingDetail } from '@/services/upload';
import _ from 'lodash';
import { Effect, Reducer } from 'umi';

export interface NewDetectState {
  data: any;
  isLoading: boolean;
}

export interface NewDetectType {
  namespace: string;
  state: NewDetectState;
  effects: {
    fetchData: Effect;
  };
  reducers: {
    isLoading: Reducer;
    loadData: Reducer;
  };
}

const NewDetectModel: NewDetectType = {
  namespace: 'newdetect',
  state: {
    data: [],
    isLoading: false,
  },
  effects: {
    *fetchData(_, { call, put }) {
      yield put({
        type: 'isLoading',
      });
      const detect = yield call(fetchNewestDetect);
      const allDrawer = yield call(fetchTrackingDetail, detect.data[0].id);
      console.log("DETECT", detect);
      console.log("allDrawer", allDrawer);
    //   yield put({
    //     type: 'loadData',
    //     payload: result,
    //   });
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

export default NewDetectModel;
