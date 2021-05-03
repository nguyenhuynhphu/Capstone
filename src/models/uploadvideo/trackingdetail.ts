import {
  fetchBookInDrawer,
  fetchDrawer,
  fetchError,
  fetchRecord,
  fetchTrackingDetail,
  fetchUndifileError,
  findBookShelf,
  getBookById,
  updateError,
  updateUndefined,
} from '@/services/upload';
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
      

      const detectDrawer = yield call(fetchTrackingDetail, payload);
      if (detectDrawer.length != 0) {

        for (let j = 0; j < detectDrawer.length; j++) {
          const drawer = detectDrawer[j];
          const error = yield call(fetchError, drawer.id);
          const undifileError = yield call(fetchUndifileError, drawer.id);
          var tmp2 = _.concat(error, undifileError);
          tmp2.forEach((error:any) => {
            error.key = error.id + '_' + error.typeError;
          });
          drawer.error = tmp2;
        }
      }
      yield put({
        type: 'loadData',
        payload: detectDrawer,
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
