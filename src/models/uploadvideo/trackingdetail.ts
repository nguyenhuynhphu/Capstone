import { fetchError, fetchRecord, fetchTrackingDetail, findBookShelf, insertRecord } from '@/services/upload';
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
  };
  reducers: {
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
    listError: []
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
        // yield put({
        //     type: 'isLoading',
        //   });
        const response = yield call(fetchError, payload);
        yield put({
          type: 'loadError',
          payload: response,
        });
      },
    
  },
  reducers: {
    isLoading(state, { }) {
        return {
          ...state,
          isLoading: true,
        };
    },
    loadData(state, { payload }) {
        payload.forEach((record: any) => {
            record.key = record.id
        });
        return {
            ...state,
            isLoading: false,
            data: payload
        };
    },
    loadError(state, { payload }) {
        payload.forEach((error: any) => {
            error.key = error.id
        });
        return {
            ...state,
            listError: payload
        };
    },
  },
};

export default TrackingDetailModel;
