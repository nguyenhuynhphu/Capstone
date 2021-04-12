import {
  confirmError,
  confirmErrorUndefined,
  fetchError,
  fetchRecord,
  fetchTrackingDetail,
  fetchUndifileError,
  findBookShelf,
  insertRecord,
  updateError,
  updateUndefined,
} from '@/services/upload';
import { response } from 'express';
import _ from 'lodash';
import { Effect, Reducer } from 'umi';

export interface TrackingDetailState {
  data: any;
  isLoading: boolean;
  listError: any;
}

export interface TrackingDetailType {
  namespace: string;
  state: TrackingDetailState;
  effects: {
    fetchData: Effect;
    fetchError: Effect;

    updateError: Effect;
    updateErrorUndefined: Effect;
  };
  reducers: {
    resetState: Reducer;
    isLoading: Reducer;
    loadData: Reducer;
    loadError: Reducer;
  };
}

const TrackingDetailModel: TrackingDetailType = {
  namespace: 'trackingdetail',
  state: {
    data: [],
    isLoading: false,
    listError: [],
  },
  effects: {
    *fetchData({ payload }, { put, call }) {
      yield put({
        type: 'isLoading',
      });
      const response = yield call(fetchTrackingDetail, payload);
      yield put({
        type: 'loadData',
        payload: response,
      });
    },

    *fetchError({ payload }, { put, call }) {
      yield put({
        type: 'isLoading',
      });

      const response = yield call(fetchError, payload);
      const response2 = yield call(fetchUndifileError, payload);
      var tmp = _.concat(response, response2);

      yield put({
        type: 'loadError',
        payload: tmp,
      });
    },

    *updateError({ payload }, { put, call }) {
      yield call(updateError, payload);
    },
    *updateErrorUndefined({ payload }, { put, call }) {
      yield call(updateUndefined, payload);
    },

  },
  reducers: {
    resetState(state, {}) {
      return {
        ...state,
        data: [],
        isLoading: false,
        listError: [],
      };
    },
    isLoading(state, {}) {
      return {
        ...state,
        isLoading: true,
      };
    },
    loadData(state, { payload }) {
      payload.forEach((record: any) => {
        record.key = record.id;
      });
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    },
    loadError(state, { payload }) {
      payload.forEach((error: any) => {
        error.key = error.id;
      });
      return {
        ...state,
        isLoading: false,
        listError: payload,
      };
    },
  },
};

export default TrackingDetailModel;
