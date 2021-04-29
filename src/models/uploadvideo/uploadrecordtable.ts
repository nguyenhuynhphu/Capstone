import { fetchRecord, findBookShelf, insertRecord } from '@/services/upload';
import { Effect, Reducer } from 'umi';

export interface UploadRecordTableState {
  data: any;
  isLoading: boolean;
  filterRecord: any;
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
      pageSize: 10,
      showSizeChanger: false
    },
    filterRecord: [
      '',
      ''
    ],
    isLoading: false,
  },
  effects: {
    *fetchData({ payload }, { put, call }) {
      yield put({
        type: 'isLoading',
      });

      const response = yield call(fetchRecord, payload);
      yield put({
        type: 'loadData',
        payload: { response: response, filter: payload },
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
      const { response, filter } = payload;

      response.data.forEach((bookGroup: any) => {
        bookGroup.key = bookGroup.id;
      });
      return {
        ...state,
        filterRecord: filter.filterRecord,
        data: response.data,
        pagination: {
          current: filter.pagination,
          pageSize: 10,
          total: response.meta.totalCount,
          showSizeChanger: false
        },
        isLoading: false,
      };
    },
  },
};

export default UploadRecordTableModel;
