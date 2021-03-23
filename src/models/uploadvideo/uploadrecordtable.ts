import { fetchRecord, findBookShelf, insertRecord } from '@/services/upload';
import { Effect, Reducer } from 'umi';

export interface UploadRecordTableState {
  data: any;
  isLoading: boolean;
  filterName: string;
  pagination: any;
}

export interface UploadRecordTableType {
  namespace: string;
  state: UploadRecordTableState;
  effects: {
    fetchData: Effect;
  };
  reducers: {
    isLoading: Reducer;
    loadData: Reducer;
  };
}

const UploadRecordTableModel: UploadRecordTableType = {
  namespace: 'uploadrecordtable',
  state: {
    data: [],
    pagination: {
      current: 1,
      total: 0,
    },
    filterName: '',
    isLoading: false,
  },
  effects: {
    *fetchData({ payload }, { put, call }) {
      yield put({
        type: 'isLoading',
      });
      const response = yield call(fetchRecord, payload);
      console.log(response);

      yield put({
        type: 'loadData',
        payload: response,
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
      payload.forEach((record: any) => {
        record.key = record.id;
      });
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    },
  },
};

export default UploadRecordTableModel;
