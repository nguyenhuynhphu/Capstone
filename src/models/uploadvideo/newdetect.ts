

import {

  fetchDetectionByBookShelfName,
  fetchDrawer,
  fetchNewestDetect,
  fetchTrackingDetail,
} from '@/services/upload';
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
      const notFoundDrawer = yield call(fetchDrawer, detect.data[0].bookShelfId);
      const allDrawer = yield call(fetchTrackingDetail, detect.data[0].id);
      const totalDetect = yield call(fetchDetectionByBookShelfName, detect.data[0].bookShelfName);
      const compareError = yield call(fetchTrackingDetail, totalDetect.data[1].id);

      var result: any = { ...detect.data[0] };
      result.drawerDetection = allDrawer;
      var totalError = 0;
      var tmpError = 0;
      if (allDrawer.length != 0) {
        allDrawer.forEach((drawer: any) => {
          totalError += drawer.count;
        });
      }
      if (compareError.length != 0) {
        compareError.forEach((drawer: any) => {
          tmpError += drawer.count;
        });
      }
      var compare = totalError - tmpError;
      result.compareLastTime = compare;
      result.totalError = totalError;
      result.totalDetect = totalDetect.meta.totalCount;
      result.notFoundDrawer = notFoundDrawer.length;
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

export default NewDetectModel;
